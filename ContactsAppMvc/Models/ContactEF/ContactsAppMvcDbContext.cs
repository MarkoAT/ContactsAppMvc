using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace ContactsAppMvc.Models.ContactEF
{
    public class ContactsAppMvcDbContext : DbContext
    {
        public ContactsAppMvcDbContext() : base("name = ContactsAppMvcDbContext")
        {
        }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            base.OnModelCreating(modelBuilder);
        }

        public System.Data.Entity.DbSet<ContactsAppMvc.Models.ContactEF.Contact> Contacts { get; set; }
    }
}