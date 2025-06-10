namespace VehicleApi.Dtos
{
    public class CarCreateUpdateDto
    {
        public string VIN { get; set; }
        public string LicensePlateNumber { get; set; }
        public string ModelName { get; set; }
        public string Colour { get; set; }
        public int BrandId { get; set; }
        public List<int> CarEquipmentIds { get; set; } = new List<int>();
    }
}