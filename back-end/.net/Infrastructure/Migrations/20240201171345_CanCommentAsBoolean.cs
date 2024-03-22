using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Infrastructure.Migrations
{
    public partial class CanCommentAsBoolean : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.Sql($"UPDATE Posts set CanComment = 1 where CanComment > 0");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
