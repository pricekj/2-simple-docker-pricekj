
const SomeApp = {
  data() {
    return {
      students: [],
      selectedStudent: null,
      offers: [],
      books: [],
      offerForm: {},
      booksForm: {},
      selectedOffer: null,
      selectedBook: null,
      offer: []
    }
  },
  computed: {},
  methods: {
      prettyData(d) {
          return dayjs(d)
          .format('D MMM YYYY')
      },
      prettyDollar(n) {
          const d = new Intl.NumberFormat("en-US").format(n);
          return "$ " + d;
      },
      selectStudent(s) {
          if (s == this.selectedStudent) {
              return;
          }
          this.selectedStudent = s;
          this.offers = [];
          this.fetchOfferData(this.selectedStudent);
      },
    //   selectBook(b) {
    //     if (b == this.selectedBook) {
    //         return;
    //     }
    //     this.selectedBook = b;
    //     this.books = [];
    //     this.fetchBookData(this.selectedBook);
    // },
      fetchStudentData() {
          fetch('/api/student/')
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.students = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
      },
      fetchBookData() {
        fetch('/api/books/')
        .then( response => response.json() )
        .then( (responseJson) => {
            console.log(responseJson);
            this.books = responseJson;
        })
        .catch( (err) => {
            console.error(err);
        })
    },
      fetchOfferData(s) {
          console.log("Fetching offer data for ", s);
          fetch('/api/offer/?student=' + s.id)
          .then( response => response.json() )
          .then( (responseJson) => {
              console.log(responseJson);
              this.offers = responseJson;
          })
          .catch( (err) => {
              console.error(err);
          })
          .catch( (error) => {
              console.error(error);
          });
      },
      postOffer(evt) {
        console.log ("Test:", this.selectedOffer);
      if (this.selectedOffer) {
          this.postEditOffer(evt);
      } else {
          this.postNewOffer(evt);
      }
    },
    //edit/update offer
    postEditOffer(evt) {
      this.offerForm.id = this.selectedOffer.id;
      this.offerForm.studentId = this.selectedStudent.id;        
      
      console.log("Editing!", this.offerForm);

      fetch('api/offer/update.php', {
          method:'POST',
          body: JSON.stringify(this.offerForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.offers = json;
          
          // reset the form
          this.handleResetEdit();
        });
    },
    //delete offer
    postDeleteOffer(o) {  
      if ( !confirm("Are you sure you want to delete the offer from " + o.companyName + "?") ) {
          return;
      }  
      
      console.log("Delete!", o);

      fetch('api/offer/delete.php', {
          method:'POST',
          body: JSON.stringify(o),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.offers = json;
          
          // reset the form
          this.handleResetEdit();
        });
    },
      // UPDATE BOOK
      postBook(evt) {
        console.log ("Test:", this.selectedBook);
      if (this.selectedBook) {
          this.postEditBook(evt);
      } else {
          this.postNewBook(evt);
      }
    },

    postEditBook(evt) {
      this.booksForm.id = this.selectedBook.id;       
      
      console.log("Editing!", this.booksForm);

      fetch('api/books/update.php', {
          method:'POST',
          body: JSON.stringify(this.booksForm),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;
          
          // reset the form
          this.handleResetEditBook();
        });
    },
        //delete book
    postDeleteBook(bk) {  
      if ( !confirm("Are you sure you want to delete this book: " + bk.title + "?") ) {
          return;
      }  
      
      console.log("Delete!", bk);

      fetch('api/books/delete.php', {
          method:'POST',
          body: JSON.stringify(bk),
          headers: {
            "Content-Type": "application/json; charset=utf-8"
          }
        })
        .then( response => response.json() )
        .then( json => {
          console.log("Returned from post:", json);
          // TODO: test a result was returned!
          this.books = json;
          
          // reset the form
          this.handleResetEditBook();
        });
    },
      /// new offer
      postNewOffer(evt) {
        this.offerForm.studentId = this.selectedStudent.id;        
        console.log("Posting:", this.offerForm);
        // alert("Posting!");
    
        fetch('api/offer/create.php', {
            method:'POST',
            body: JSON.stringify(this.offerForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.offers = json;
            
            // reset the form
            this.handleResetEdit = {};
          });
      },
      postNewBook(evt) {
        // this.booksForm.id = this.selectedbooks.id;        
        console.log("Posting:", this.booksForm);
        // alert("Posting!");
    
        fetch('api/books/create.php', {
            method:'POST',
            body: JSON.stringify(this.booksForm),
            headers: {
              "Content-Type": "application/json; charset=utf-8"
            }
          })
          .then( response => response.json() )
          .then( json => {
            console.log("Returned from post:", json);
            // TODO: test a result was returned!
            this.books = json;
            
            // reset the form
            this.handleResetEditBook();
          });
      },

      handleEditOffer(offer) {
        this.selectedOffer = offer;
        this.offerForm = Object.assign({}, this.selectedOffer);
      },
      handleResetEdit() {
        this.selectedOffer = null;
        this.offerForm = {};
      },
      //book edit
      handleEditBooks(book) {
        console.log("selecting", book);
        this.selectedBook = book;
        this.booksForm = Object.assign({}, this.selectedBook);
      },
      handleResetEditBook() {
        this.selectedBook = null;
        this.booksForm = {};
      }

  
    },

  
  
  created() {
      this.fetchStudentData();
      this.fetchBookData();
  }

}

Vue.createApp(SomeApp).mount('#offerApp');
