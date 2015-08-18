// Meteor.startup(function(){
//   var stripeKey = Meteor.settings.public.stripe.testPublishableKey;
//   Stripe.setPublishableKey(stripeKey);

//   STRIPE = {
//     getToken: function (domElement, card, cb) {
//       Stripe.card.createToken(card, function(status, response) {
//         if(response.error) {
//           alert(response.error.message, "danger");
//         } else {
//           STRIPE.setToken(response.id, domElement, cb);
//         }
//       });
//     },
//     setToken: function (token, domElement, cb) {
//       $(domElement).append($("<input type='hidden' name='stripeToken' />").val(token));
//       cb();
//     }
//   };
// });
