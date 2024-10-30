using System;
using System.Collections.Generic;

namespace Project9Animal.Server.Models;

public partial class Shelter
{
    public int ShelterId { get; set; }

    public string ShelterName { get; set; } = null;

    public string? Description { get; set; }

    public string? ContactEmail { get; set; }

    public string? Phone { get; set; }

    public string? OpeningTime { get; set; }

    public string? Address { get; set; }

    public virtual ICollection<Animal> Animals { get; set; } = new List<Animal>();
}
