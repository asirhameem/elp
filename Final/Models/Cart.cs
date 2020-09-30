using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final.Models
{
    public class Cart
    {
        [Key]
        public int Cart_Id { get; set; }
        [Required]
        public int Student_Id { get; set; }
        [Required]
        public int Item_Id { get; set; }
        [ForeignKey("Item_Id")]
        public Course Course { get; set; }
        public List<HyperLink> HyperLinks = new List<HyperLink>();

    }
}