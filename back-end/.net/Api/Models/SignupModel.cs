using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class SignupModel : IValidatableObject
{
   

    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    public string Password { get; set; }
    public string ConfirmPassword { get; set; }

    public IEnumerable<ValidationResult> Validate(ValidationContext validationContext)
    {
        if (Password != ConfirmPassword) yield return new ValidationResult("Password does not match", new[] { nameof(Password), nameof(ConfirmPassword) });
    }
}

