using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace VehicleApi.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Colur",
                table: "Cars",
                newName: "Colour");

            migrationBuilder.InsertData(
                table: "Brands",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Volvo" },
                    { 2, "Toyota" },
                    { 3, "BMW" },
                    { 4, "Mercedes-Benz" },
                    { 5, "Audi" },
                    { 6, "Ford" },
                    { 7, "Honda" },
                    { 8, "Volkswagen" },
                    { 9, "Tesla" },
                    { 10, "Hyundai" }
                });

            migrationBuilder.InsertData(
                table: "CarEquipments",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Air Conditioning" },
                    { 2, "Leather Seats" },
                    { 3, "Sunroof" },
                    { 4, "Bluetooth" },
                    { 5, "Backup Camera" },
                    { 6, "Cruise Control" },
                    { 7, "Heated Seats" },
                    { 8, "Navigation System" },
                    { 9, "Keyless Entry" },
                    { 10, "Parking Sensors" }
                });

            migrationBuilder.InsertData(
                table: "Cars",
                columns: new[] { "Id", "BrandId", "Colour", "LicensePlateNumber", "ModelName", "VIN" },
                values: new object[,]
                {
                    { 1, 1, "Black", "ABC123", "XC90", "123456789" },
                    { 2, 2, "White", "XYZ789", "Corolla", "987654321" }
                });

            migrationBuilder.InsertData(
                table: "CarCarEquipment",
                columns: new[] { "CarEquipmentsId", "CarsId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 2, 1 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "CarCarEquipment",
                keyColumns: new[] { "CarEquipmentsId", "CarsId" },
                keyValues: new object[] { 1, 1 });

            migrationBuilder.DeleteData(
                table: "CarCarEquipment",
                keyColumns: new[] { "CarEquipmentsId", "CarsId" },
                keyValues: new object[] { 1, 2 });

            migrationBuilder.DeleteData(
                table: "CarCarEquipment",
                keyColumns: new[] { "CarEquipmentsId", "CarsId" },
                keyValues: new object[] { 2, 1 });

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 9);

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 10);

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "CarEquipments",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Cars",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Brands",
                keyColumn: "Id",
                keyValue: 2);

            migrationBuilder.RenameColumn(
                name: "Colour",
                table: "Cars",
                newName: "Colur");
        }
    }
}
