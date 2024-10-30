using System;
using System.Collections.Generic;

namespace Project9Animal.Server.Models;

public partial class Like
{
    public int LikeId { get; set; }

    public int? UserId { get; set; }

    public int? StoryId { get; set; }

    public virtual SuccessStory? Story { get; set; }

    public virtual User? User { get; set; }
}
