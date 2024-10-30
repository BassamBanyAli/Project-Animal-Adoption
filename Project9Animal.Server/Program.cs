using Microsoft.EntityFrameworkCore;
using Project9Animal.Server.Models;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers().AddJsonOptions(options =>
{
    // Prevent circular references in JSON serialization
    options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;

   
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<MyDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("YourConnectionString")));
//????? ????
builder.Services.AddCors(option =>
     option.AddPolicy("Develpoment", builder
     =>
     {
         // ??? ??? ??? ????? ???????? ???? ??? ????? 
         //builder.WithOrigins("http://localhost:5501");
         builder.AllowAnyOrigin();
         builder.AllowAnyMethod();
         builder.AllowAnyHeader();



     }

     ));

var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();
app.UseCors("Develpoment");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
