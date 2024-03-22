
using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class NewPostModel
{
    [Required]
    public string Body { get; set; }
    public bool CanComment { get; set; } = true;

    [Required]
    public string Title { get; set; }
}

