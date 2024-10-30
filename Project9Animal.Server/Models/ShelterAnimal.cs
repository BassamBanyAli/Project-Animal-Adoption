﻿using System;
using System.Collections.Generic;

namespace Project9Animal.Server.Models;

public partial class ShelterAnimal
{
    public int ShelterAnimalId { get; set; }

    public int ShelterId { get; set; }

    public int AnimalId { get; set; }

    public virtual Animal Animal { get; set; } = null!;

    public virtual Shelter Shelter { get; set; } = null!;
}