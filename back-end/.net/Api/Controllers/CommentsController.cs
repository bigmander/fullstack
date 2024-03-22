using Application.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CommentsController : ControllerBase
    {
        readonly CommentsRepository _commentsRepository;
        readonly IAuthorizationService _authorizationService;

        public CommentsController(
            CommentsRepository commentsRepository,
            IAuthorizationService authorizationService
        )
        {
            _commentsRepository = commentsRepository;
            _authorizationService = authorizationService;
        }

        [HttpDelete("{id}")]
        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]

        public async Task<IActionResult> DeleteCommentById(Guid id)
        {

            var comment = await _commentsRepository.GetAsync(id);
            if (comment == null) return NotFound();

            var authResult = await _authorizationService.AuthorizeAsync(User, comment, "Owner");
            if (!authResult.Succeeded) return Forbid();

            await _commentsRepository.DeleteAsync(comment);

            return NoContent();
        }
    }
}
