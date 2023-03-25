using backend.Core.Enums;

namespace backend.Core.Entities
{
    public class Company : BaseEntity
    {
        public string Name { get; set; }
        public CompanySize Size{ get; set; }

        // Relations
        public ICollection<Job> Jobs { get; set; }
    }
}
