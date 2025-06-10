namespace VehicleApi.Dtos
{
    public class BrandDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        // Vi tar inte med listan på bilar här för att undvika cykel
    }
}
