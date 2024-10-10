using Api.DTOs;
using Api.Models;

using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text.Json;
using IOFile = System.IO.File;
using System.Reflection;

namespace Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PostsController : ControllerBase
{
    IEnumerable<PostDTO> _posts;

    public PostsController()
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
        var result = PreparePosts(User.Identity.Name)
            .Where(p =>
                string.IsNullOrEmpty(search) ||
                p.Title.StartsWith(search, StringComparison.CurrentCultureIgnoreCase) ||
                p.Body.StartsWith(search, StringComparison.CurrentCultureIgnoreCase)
        );

        return Ok(result);
    }

    [AllowAnonymous]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        var post = PreparePosts(User.Identity.Name).FirstOrDefault(p => p.Id == id);
        if (post == null)
        {
            return NotFound(post);
        }
        return Ok(new PostDTO(post, User.Identity.Name));
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("{id}/comments")]
    public async Task<IActionResult> AddComment(Guid id, [FromBody] NewCommentModel model)
    {
        var post = PreparePosts(User.Identity.Name).FirstOrDefault(p => p.Id == id);
        if (post == null)
        {
            return NotFound(post);
        }

        if (!post.CanComment)
        {
            return Forbid();
        }

        var newComment = new CommentDTO(model.Title, model.Body, post.Id, User.Identity.Name, post.Author);
        return CreatedAtAction(nameof(GetById), new { id }, newComment);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> AddPost([FromBody] NewPostModel model)
    {
        var newPost = new PostDTO(
            model.Title, 
            model.Body, 
            model.CanComment,
            User.Identity.Name
        );
        return CreatedAtAction(nameof(GetById), new { id = newPost.Id }, newPost);
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> DeletePostById(Guid id)
    {
        var found = PreparePosts(User.Identity.Name).FirstOrDefault(p => p.Id == id);
        if (found == null)
        {
            return NotFound(found);
        }
        if (!found.CanManage)
        {
            return Forbid();
        }
        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdatePostModel model)
    {
        var found = PreparePosts(User.Identity.Name).FirstOrDefault(p => p.Id == id);
        if (found == null)
        {
            return NotFound(found);
        }

        if (!found.CanManage)
        {
            return Forbid();
        }

        
        found.Update(model.Title, model.Body, model.CanComment, User.Identity.Name);

        return AcceptedAtAction(nameof(GetById), new { id }, found);
    }
}
