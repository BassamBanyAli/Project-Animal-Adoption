using System;
using System.Collections.Generic;

namespace Project9Animal.Server.Models;

public partial class SuccessStory
{
    public int StoryId { get; set; }

    public int UserId { get; set; }

    public int? AnimalId { get; set; }

    public string? Title { get; set; }

    public string? StoryText { get; set; }

    public string? Status { get; set; }

    public DateTime? StoryDate { get; set; }

    public string? PhotoUrl1 { get; set; }

    public string? PhotoUrl2 { get; set; }

    public string? PhotoUrl3 { get; set; }

    public string? PhotoUrl4 { get; set; }

    public virtual Animal? Animal { get; set; }

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual User User { get; set; } = null!;
}
