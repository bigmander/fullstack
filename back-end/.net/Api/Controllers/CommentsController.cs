using Api.DTOs;
using Application.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Reflection;
using System.Text.Json;
using IOFile = System.IO.File;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        readonly CommentsRepository _commentsRepository;

        public CommentsController(
           CommentsRepository commentsRepository
        )
        {
            _commentsRepository = commentsRepository;
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> DeleteCommentById(Guid id)
        {
            var comment = await _commentsRepository.GetAsync(id);

            if (comment == null)
            {
                return NotFound();
            }

            if (
                !comment.CanManage(User.Identity.Name)
            ) {
                return Forbid();
            }

            await _commentsRepository.DeleteAsync(comment);
            await _commentsRepository.SaveChangesAsync();

            return NoContent();
        }
    }
}
