using System.ComponentModel.DataAnnotations;

namespace Api.Models;
public class UpdatePostModel
{
    [Required]
    public Guid Id { get; set; }
    [Required]
    public string Body { get; set; }
    public bool CanComment { get; set; } = true;
    [Required]
    public string Title { get; set; }
}