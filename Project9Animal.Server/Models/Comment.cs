using System;
using System.Collections.Generic;

namespace Project9Animal.Server.Models;

public partial class Comment
{
    public int CommentId { get; set; }

    public int? StoryId { get; set; }

    public int? UserId { get; set; }

    public string? Comment1 { get; set; }

    public DateTime? CommentDate { get; set; }

    public virtual ICollection<Reply> Replies { get; set; } = new List<Reply>();

    public virtual SuccessStory? Story { get; set; }

    public virtual User? User { get; set; }
}
