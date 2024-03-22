using Application.Repositories;
using Infrastructure.Persistence;
using Api.Extensions;
using Microsoft.OpenApi.Models;
using Microsoft.AspNetCore.Authorization;
using Application.AuthRequirements;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddCors();

builder.Services.AddControllers();



// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddDbContext<ApplicationDbContext>();
builder.Services.AddDefaultIdentity<ApplicationUser>(opts => opts.SignIn.RequireConfirmedAccount = true).AddEntityFrameworkStores<ApplicationDbContext>();
builder.Services.AddSingleton<IAuthorizationHandler, OwnerAuthorizationHandler>();


builder.Services.AddScoped<PostsRepository>();
builder.Services.AddScoped<CommentsRepository>();


builder.Services.AddJWTTokenServices(builder.Configuration);



builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        Scheme = "Bearer",
        BearerFormat = "JWT",
        In = ParameterLocation.Header,
        Description = "JWT Authorization header using the Bearer scheme."
    });
    options.AddSecurityRequirement(new OpenApiSecurityRequirement {
        {
            new OpenApiSecurityScheme {
                    Reference = new OpenApiReference {
                        Type = ReferenceType.SecurityScheme,
                            Id = "Bearer"
                    }
                },
                new string[] {}
        }
    });
});

//
builder.Services.AddAuthorization(options =>
{
    options.AddPolicy("Owner", policyBuilder => policyBuilder.AddRequirements(new OwnerRequirement()));
});


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors(builder =>
{
    builder.WithOrigins("http://localhost:4200")
    .AllowAnyMethod().AllowAnyHeader().AllowCredentials();
});

app.UseAuthorization();

app.MapControllers();

app.Run();
