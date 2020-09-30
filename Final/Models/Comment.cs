using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace Final.Models
{
    public class Comment
    {
        [Key]
        public int CommentId { get; set; }
        [Required]

        public string CommentDetails { get; set; }
        [Required]

        public string Uname { get; set; }
        [Required]

        public int PostId { get; set; }
        [ForeignKey("PostId")]
        public Post Post { get; set; }
        public List<HyperLink> HyperLinks = new List<HyperLink>();


    }
}