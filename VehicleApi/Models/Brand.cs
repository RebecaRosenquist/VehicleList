namespace VehicleApi.Models
{
    public class Brand
    {
        public int Id { get; set; }               
        public string Name { get; set; }          

        // ett märke kan ha flera bilar, varje bil kan ha ett märke 1N(ett till många)
        public ICollection<Car> Cars { get; set; }
    }
}