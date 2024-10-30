using System;
using System.Collections.Generic;

namespace Project9Animal.Server.Models;

public partial class Category
{
    public int Id { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? Image { get; set; }

    public virtual ICollection<Animal> Animals { get; set; } = new List<Animal>();
}
