using Api.Models;
using Api.Helpers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Infrastructure.Persistence;

namespace Api.Controllers;

[Route("api")]
[ApiController]
public class DefaultController : ControllerBase
{
    private readonly JwtSettings _settings;
    private readonly UserManager<ApplicationUser> _userManager;
    public DefaultController(JwtSettings settings, UserManager<ApplicationUser> userManager)
    {
        _settings = settings;
        _userManager = userManager;
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Login(LoginModel model)
    {


        var user = await _userManager.FindByEmailAsync(model.Email);

        if (user == null) return Unauthorized();

        var canLogin = await _userManager.CheckPasswordAsync(user, model.Password);

        if (!canLogin)
        {
            ModelState.AddModelError(nameof(model.Email), "Email or password invalid");
            return BadRequest(ModelState);
        }

        var token = JwtHelper.GenerateToken(new ApplicationToken
        (
            user.Id,
            model.Email,
            user.UserName
        ), _settings);

        return Ok(new AuthenticatedUserModel(token.Token));
    }

    [HttpPost("[action]")]
    public async Task<IActionResult> Signup(SignupModel model)
    {


        var user = new ApplicationUser
        {
            Email = model.Email,
            UserName = model.Email,

        };

        var result = await _userManager.CreateAsync(user, model.Password);
        if (!result.Succeeded) return BadRequest(result.Errors);



        return Accepted();
    }

}

