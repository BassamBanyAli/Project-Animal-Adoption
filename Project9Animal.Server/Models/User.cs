using System;
using System.Collections.Generic;

namespace Project9Animal.Server.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? FullName { get; set; }

    public string? Password { get; set; }

    public byte[]? HashPassword { get; set; }

    public byte[]? SaltPassword { get; set; }

    public string? Email { get; set; }

    public string? Address { get; set; }

    public string? MedicalStatus { get; set; }

    public string? FlatType { get; set; }

    public string? FinaincalStatus { get; set; }

    public bool? HaveKids { get; set; }

    public string? MoreDetails { get; set; }

    public bool? IsAdmin { get; set; }

    public virtual ICollection<AdoptionApplication> AdoptionApplications { get; set; } = new List<AdoptionApplication>();

    public virtual ICollection<Comment> Comments { get; set; } = new List<Comment>();

    public virtual ICollection<Like> Likes { get; set; } = new List<Like>();

    public virtual ICollection<Reply> Replies { get; set; } = new List<Reply>();

    public virtual ICollection<SuccessStory> SuccessStories { get; set; } = new List<SuccessStory>();

    public virtual ICollection<Testimonial> Testimonials { get; set; } = new List<Testimonial>();
}
