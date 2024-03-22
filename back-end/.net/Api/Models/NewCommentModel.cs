using System.ComponentModel.DataAnnotations;

namespace Api.Models;

public class NewCommentModel
{
    [Required]
    public string Title { get; set; }
    [Required]
    public string Body { get; set; }
}

