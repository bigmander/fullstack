using Api.DTOs;
using Api.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using IOFile = System.IO.File;
using System.Reflection;
using Application.Repositories;
using Domain;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    IEnumerable<PostDTO> _posts;
    readonly PostsRepository _postsRepository;
    readonly CommentsRepository _commentsRepository;
    public PostsController(PostsRepository postsRepository, CommentsRepository commentsRepository)
    {
        LoadInfo();

        _postsRepository = postsRepository;
        _commentsRepository = commentsRepository;

    }

    void LoadInfo()
    {
        string path = Path.Combine(Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location), @"Assets\data.json");

        string json = IOFile.ReadAllText(path);

        var options = new JsonSerializerOptions
        {
            PropertyNameCaseInsensitive = true
        };
        _posts = JsonSerializer.Deserialize<IEnumerable<PostDTO>>(json, options);
    }

    IEnumerable<PostDTO> PreparePosts(string author)
    {
        return _posts
            .Select(p => new PostDTO(p, author));
    }


    [AllowAnonymous]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery(Name = "q")] string? search = ""
    )
    {
        var posts = await _postsRepository.GetAsync();

        var result = posts.Select(p => new PostDTO(p, User.Identity.Name));
        return Ok(result);
    }

    [AllowAnonymous]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var post = await _postsRepository.GetAsync(id);

        if (post == null)
        {
            return NotFound();
        }

        return Ok(new PostDTO(post, User.Identity.Name));
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> AddPost([FromBody] NewPostModel model)
    {
        var post = new Post(model.Title, model.Body
            , model.CanComment, User.Identity.Name);

        await _postsRepository.InsertAsync(post);

        await _postsRepository.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = post.Id }, new PostDTO(post, User.Identity.Name));
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> DeletePostById(Guid id)
    {
        var posts = PreparePosts(User.Identity.Name);

        var post = posts.FirstOrDefault(p => p.Id == id);

        if (post == null)
        {
            return NotFound();
        }

        if (!post.CanManage)
        {
            return Forbid();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdatePostModel model)
    {

        var post = await _postsRepository.GetAsync(id);

        if (post == null)
        {
            return NotFound();
        }

        if (!post.CanManage(User.Identity.Name))
        {
            return Forbid();
        }

        post.Update(User.Identity.Name, model.Title, model.Body, model.CanComment);
        await _postsRepository.UpdateAsync(post);
        await _postsRepository.SaveChangesAsync();

        return AcceptedAtAction(nameof(GetById), new { id = post.Id }, post);
    }


    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("{id}/comments")]
    public async Task<IActionResult> AddComment(Guid id, [FromBody] NewCommentModel model)
    {
        var post = await _postsRepository.GetAsync(id);

        if (post == null)
        {
            return NotFound();
        }

        if (!post.CanComment)
        {
            return BadRequest();
        }

        var comment = new Comment(post, model.Title, model.Body, User.Identity.Name);
        await _commentsRepository.InsertAsync(comment);
        await _commentsRepository.SaveChangesAsync();

        return CreatedAtAction(nameof(GetById), new { id = post.Id }, new PostDTO(post, User.Identity.Name));
    }

}
