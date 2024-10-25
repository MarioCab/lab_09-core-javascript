/**
 * Script to process the submitted form data of the form in file
 * artsdealer.html
 */

/**
 * Sets the value of the hidden form field to a string with the formatted
 * submitted form data. If invalid form data is submitted, the hidden form
 * field value is set to an empty string. Form fields have to meet the
 * following criteria:
 * title: must be an non-empty string
 * artist: must be an non-empty string
 * year: must be a postiive integer value or empty
 * price: must be a non-negative value
 * description: any string, possibly an empty string
 *
 * @returns {boolean} true
 */
function prepareSummary() {
  console.log("starting script");

  let data = {
    title: document.forms[0].title.value.toString(),
    artist: document.forms[0].artist.value.toString(),
    year: document.forms[0].year.value.toString(),
    price: document.forms[0].price.value.toString(),
    description: document.forms[0].description.value.toString(),
  };
  console.log("made it passed data");

  if (validateAndParseArtworkData(data)) {
    document.forms[0].summary.value = formatSummary(data);
    console.log("Good data");
  } else {
    document.forms[0].summary.value = "";
    console.log("bad data");
  }
  /*document.forms[0].summary.value = "";*/
  return true;
}
/**
 * Validates the submitted object properties. Properties have to meet the
 * following criteria:
 *  artwork.title: must be an non-empty string
 *  artwork.artist: must be an non-empty string
 *  artwork.year: must be an empty string or represent a non-negative integer
 *  artwork.price: must be a non-negative value
 * The price and year property are set to the number they represent. If
 * artwork.year is an empty string, artwork.year is set to the value NaN.
 *
 * @param {object} artwork the object containing the submitted artwork data
 * @param {string} artwork.title the title of the artwork
 * @param {string} artwork.artist the name of the artist
 * @param {string} artwork.year the year the artwork was created
 * @param {string} artwork.price the sales price
 * @param {string} artwork.description the description of the artwork
 * @returns {boolean} false if invalid data is submitted; otherwise,
 * returns true
 */
function validateAndParseArtworkData(artwork) {
  let validData = true;

  if (artwork.title == "") {
    validData = false;
  }

  if (artwork.artist == "") {
    validData = false;
  }

  if (artwork.year == "") {
    artwork.year = NaN;
  } else if (parseInt(artwork.year) < 0) {
    validData = false;
  } else {
    artwork.year = parseInt(artwork.year);
  }

  if (artwork.price == "" || parseInt(artwork.price) < 0) {
    validData = false;
  } else {
    artwork.price = parseInt(artwork.price);
  }
  console.log("made it passed validation");
  return validData;
}

/**
 * Format the data in object for dislpay in an HTML document. The formatted
 * string has to be of the following form:
 *   {artwork.title}<br>by {artwork.artist}<br>[Year: {artwork.year}<br>]
 *   Price: {artwork.price}<br>[Description: {artwork.description}]
 * where
 *   {artwork.title} is the string artwork.title in uppercase letters
 *   {artwork.artist} is the name of the artist
 *   {artwork.price} is the value of artwork.price with two decimal digits
 *             after the decimal point.
 *   {artwork.description} is the content of artwork.description
 * The brackets [] indicated that the included part should be omitted in case
 * artwork.year is not a number, repectively, if artwork.description is an
 * empty string.
 *
 * @param {object} artwork the object containing the submitted artwork data
 * @param {string} artwork.title the title of the artwork
 * @param {string} artwork.artist the name of the artist
 * @param {number} artwork.year the year the artwork was created
 * @param {number} artwork.price the sales price
 * @param {string} artwork.description the description of the artwork
 * @returns {string} the formatted string
 */
function formatSummary(artwork) {
  let title = artwork.title.toLocaleUpperCase();
  let artist =
    artwork.artist.charAt(0).toLocaleUpperCase +
    artwork.artist.slice(1).toLowerCase();
  let yearString = "";
  let descriptionString = "";

  if ((artwork.year = NaN)) {
    yearString = "<br>";
  } else {
    yearString = "<br>Year: ${artwork.year}";
  }

  if ((artwork.description = "")) {
    descriptionString = "";
  } else {
    descriptionString = "<br>Description: ${artwork.description}";
  }

  let formattedString = `${title}<br>by ${artist}${yearString}<br>Price: ${artwork.price}${descriptionString}`;

  console.log("made it into format");

  return formattedString;
}
