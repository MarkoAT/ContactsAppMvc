using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Helpers;
using System.Web.Mvc;
using ContactsAppMvc.Models.ContactEF;

namespace ContactsAppMvc.Controllers
{
    public class ContactController : Controller
    {
        private ContactsAppMvcDbContext db = null;
        public ContactController()
        {
            db = new ContactsAppMvcDbContext();
        }

        // Get all contacts
        public JsonResult Index()
        {
            var contacts = db.Contacts.ToList();
            return Json(contacts, JsonRequestBehavior.AllowGet);
        }

        // Get single contact by id
        public JsonResult Details(int id)
        {
            var contact = db.Contacts.Find(id);
            return Json(contact, JsonRequestBehavior.AllowGet);
        }

        // Create new contact
        [HttpPost]
        public JsonResult Create(Contact contact)
        {
            db.Contacts.Add(contact);
            db.SaveChanges();
            return Json(null);
        }

        // Edit existing contact
        [HttpPost]
        public JsonResult Edit(Contact contact)
        {
            db.Entry(contact).State = System.Data.Entity.EntityState.Modified;
            db.SaveChanges();
            return Json(null);
        }

        // Delete existing contact
        [HttpPost]
        public JsonResult Delete(int id)
        {
            var contact = db.Contacts.Find(id);
            db.Contacts.Remove(contact);
            db.SaveChanges();
            return Json(null);
        }
    }
}