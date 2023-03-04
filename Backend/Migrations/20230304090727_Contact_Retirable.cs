using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace ContactApp.Backend.Migrations
{
    public partial class Contact_Retirable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsRetired",
                table: "Contacts",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<DateTime>(
                name: "RetiredOn",
                table: "Contacts",
                type: "datetime2",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsRetired",
                table: "Contacts");

            migrationBuilder.DropColumn(
                name: "RetiredOn",
                table: "Contacts");
        }
    }
}
