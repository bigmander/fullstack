using Api.DTOs;
using Api.Models;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using IOFile = System.IO.File;
using System.Reflection;
using Application.Repositories;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    IEnumerable<PostDTO> _posts;
    readonly PostsRepository _postsRepository;
    public PostsController(PostsRepository postsRepository)
    {
        LoadInfo();

        _postsRepository = postsRepository;

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
        return Ok(posts.Select(p => new PostDTO(p, User.Identity.Name)));
    }

    [AllowAnonymous]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var posts = PreparePosts(User.Identity.Name);

        var post = posts.FirstOrDefault(p => p.Id == id);

        if (post == null) {
            return NotFound();
        }

        return Ok(post);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> AddPost([FromBody] NewPostModel model)
    {
        var post = new PostDTO(model.Title, model.Body, model.CanComment, User.Identity.Name);
        
        return CreatedAtAction(nameof(GetById), new { id = post.Id }, post);
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> DeletePostById(Guid id)
    {
        var posts = PreparePosts(User.Identity.Name);

        var post = posts.FirstOrDefault(p => p.Id == id);

        if (post == null) {
            return NotFound();
        }

        if (!post.CanManage) {
            return Forbid();
        }

        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdatePostModel model)
    {
        var posts = PreparePosts(User.Identity.Name);

        var post = posts.FirstOrDefault(p => p.Id == id);

        if (post == null) {
            return NotFound();
        }

        if (!post.CanManage) {
            return Forbid();
        }

        post.Update(model.Title, model.Body, model.CanComment, User.Identity.Name);

        return AcceptedAtAction(nameof(GetById), new { id = post.Id }, post);
    }

    
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("{id}/comments")]
    public async Task<IActionResult> AddComment(Guid id, [FromBody] NewCommentModel model)
    {
        var posts = PreparePosts(User.Identity.Name);

        var post = posts.FirstOrDefault(p => p.Id == id);

        if (post == null) {
            return NotFound();
        }

        if (!post.CanComment) {
            return BadRequest();
        }

        var comment = new CommentDTO(model.Title, model.Body, post.Id, User.Identity.Name, post.Author);

        return CreatedAtAction(nameof(GetById), new { id = post.Id }, comment);
    }

}
