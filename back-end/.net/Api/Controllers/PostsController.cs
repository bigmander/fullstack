using Api.DTOs;
using Api.Models;
using Api.Extensions;
using Application.Repositories;
using Domain;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    readonly PostsRepository _postsRepository;
    readonly IAuthorizationService _authorizationService;

    readonly CommentsRepository _commentsRepository;

    public PostsController(
        PostsRepository postsRepository, 
        CommentsRepository commentsRepository,
        IAuthorizationService authorizationService
    ) {
        _postsRepository = postsRepository;
        _commentsRepository = commentsRepository;

        _authorizationService = authorizationService;
    }



    [AllowAnonymous]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery(Name ="q")] string? search = ""
    )
    {
        var result = await _postsRepository.QueryAll(search);
            

        return Ok(result.Select(p => new PostDTO(p, User.Identity.Name)));
    }

    [AllowAnonymous]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var p = await _postsRepository.GetAsync(id);

        if (p == null) return NotFound();

        return Ok(new PostDTO(p, User.Identity.Name));
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("{id}/comments")]   
    public async Task<IActionResult> AddComment(Guid id, [FromBody] NewCommentModel model)
    {
        var _post = await _postsRepository.GetAsync(id);
        if (_post == null) return NotFound();

        if (!_post.IsAuthToComment())
        {
            return BadRequest();
        }

        string author = User.Identity.Name;
        var comment = new Comment(_post, model.Title, model.Body, author);
        await _commentsRepository.InsertAsync(comment);
        
        return CreatedAtAction(nameof(GetById), new { id = _post.Id }, new PostDTO(_post, author));
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> AddPost([FromBody] NewPostModel model)
    {
        string author = User.Identity.Name;
        var post = new Post(model.Title, model.Body, model.CanComment, author);
        await _postsRepository.InsertAsync(post);

        return CreatedAtAction(nameof(GetById), new { id = post.Id }, new PostDTO(post, author));
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    
    public async Task<IActionResult> DeletePostById(Guid id)
    {

        var _post = await _postsRepository.GetAsync(id);
        if (_post == null) return NotFound();

        var authResult = await _authorizationService.AuthorizeAsync(User, _post, "Owner");
        if (!authResult.Succeeded) return Forbid();

        await _postsRepository.DeleteAsync(_post);

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    
    public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdatePostModel model)
    {

        if (id != model.Id)
        {
            ModelState.AddModelError(nameof(model.Id), "Post does not exists");
            return BadRequest(ModelState);
        }

        var _post = await _postsRepository.GetAsync(id);
        if (_post == null) return NotFound();


        var authResult = await _authorizationService.AuthorizeAsync(User, _post, "Owner");
        if (!authResult.Succeeded) return Forbid();


        var author = User.Identity.Name;
        _post.Update(author, model.Title, model.Body, model.CanComment);
        await _postsRepository.UpdateAsync(_post);

        return AcceptedAtAction(nameof(GetById), new { id = _post.Id }, new PostDTO(_post, author));
    }

    
}
