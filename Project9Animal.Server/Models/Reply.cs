using System;
using System.Collections.Generic;

namespace Project9Animal.Server.Models;

public partial class Reply
{
    public int Id { get; set; }

    public int? CommentId { get; set; }

    public int? UserId { get; set; }

    public string? Comment { get; set; }

    public DateTime? CommentDate { get; set; }

    public virtual Comment? CommentNavigation { get; set; }

    public virtual User? User { get; set; }
}
