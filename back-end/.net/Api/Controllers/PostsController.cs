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
    public PostsController(
    ) {
    }


    [AllowAnonymous]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet]
    public async Task<IActionResult> GetAll(
        [FromQuery(Name ="q")] string? search = ""
    )
    {
        return Ok(search);
    }

    [AllowAnonymous]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpGet("{id}")]
    public async Task<IActionResult> GetById(Guid id)
    {
        return Ok(id);
    }

    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [HttpPost("{id}/comments")]   
    public async Task<IActionResult> AddComment(Guid id, [FromBody] NewCommentModel model)
    {
        return CreatedAtAction(nameof(GetById), new { id }, model);
    }

    [HttpPost]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> AddPost([FromBody] NewPostModel model)
    {
        return CreatedAtAction(nameof(GetById), new { id = 1 }, model);
    }

    [HttpDelete("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public async Task<IActionResult> DeletePostById(Guid id)
    {
        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)] 
    public async Task<IActionResult> UpdatePost(Guid id, [FromBody] UpdatePostModel model)
    {
        return AcceptedAtAction(nameof(GetById), new { id }, model);
    }   
}
