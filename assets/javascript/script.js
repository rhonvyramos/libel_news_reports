// var searchButton = document.querySelector("#search_button")
// var textInput = document.querySelector("#search_text_input")
// searchButton.addEventListener("click", function(){
//     console.log(textInput.value)
// } )

$( function() {
    var dateFormat = "mm/dd/yy",
      from = $( "#from" )
        .datepicker({
          defaultDate: "+1w",
          changeMonth: true,
          numberOfMonths: 3
        })
        .on( "change", function() {
          to.datepicker( "option", "minDate", getDate( this ) );
        }),
      to = $( "#to" ).datepicker({
        defaultDate: "+1w",
        changeMonth: true,
        numberOfMonths: 3
      })
      .on( "change", function() {
        from.datepicker( "option", "maxDate", getDate( this ) );
      });
 
    function getDate( element ) {
      var date;
      try {
        date = $.datepicker.parseDate( dateFormat, element.value );
      } catch( error ) {
        date = null;
      }
 
      return date;
    }
  } ); 

  function searchNews() {
    var searchTerm = document.getElementById('search-term').value;
    var apiKey = '09e64df775b241588fad642e27dd95c6';
  
    // Make an API request with the search term
    var url = 'https://api.newsapi.com/v2/search?q=' + searchTerm + '&apiKey=' + apiKey;
  
    // Use the Fetch API to make the request
    fetch(url)
      .then(function(response) {
        return response.json();
      })
      .then(function(data) {
        // Process the response data and display the news results
        displayResults(data.articles);
      })
      .catch(function(error) {
        console.log('Error:', error);
      });
  }
  
  function displayResults(articles) {
    var resultsContainer = document.getElementById('news-results2');
    resultsContainer.innerHTML = '';
  
    // Loop through the articles and create HTML elements to display them
    articles.forEach(function(article) {
      var articleElement = document.createElement('div');
      articleElement.innerHTML = '<h2>' + article.title + '</h2>' +
                                 '<p>' + article.description + '</p>' +
                                 '<a href="' + article.url + '">Read more</a>';
  
      resultsContainer.appendChild(articleElement);
    });
  }

// Create the news widget to feed api responses into  
function createNewsWidget() {
    // Create the main section element
    const newsWidgetSection = document.getElementById('news-results');
  
  // Create the news widget container
    const newsWidgetContainer = document.createElement('section');
    newsWidgetContainer.id = 'news-widget';
  
  // Create the widget content
    const widgetContent = document.createElement('div');
    widgetContent.id = 'widget-content';

  // Create the widget header
    const widgetHeader = document.createElement('div');
    widgetHeader.id = 'widget-header';

  // Create the news source element
    const newsSource = document.createElement('div');
    newsSource.id = 'news-source';
    newsSource.textContent = 'Source';

  // Create the article date element
    const articleDate = document.createElement('div');
    articleDate.id = 'article-date';
    articleDate.textContent = 'Date';

    // Append news source and article date to widget header
    widgetHeader.appendChild(newsSource);
    widgetHeader.appendChild(articleDate);

  // Create article title
    const articleTitle = document.createElement('div');
    articleTitle.id = 'article-title';
    articleTitle.textContent = 'Title';

  // Create article summary
    const articleSummary = document.createElement('div');
    articleSummary.id = 'article-summary';
    articleSummary.textContent = 'Summary';

  // Create author and category section
    const authorCategory = document.createElement('div');
    authorCategory.id = 'author-category';

  // Create author element within author and category section
    const author = document.createElement('div');
    author.id = 'author';
    author.innerHTML = 'Author:<span></span>';

  // Create category element within author and category section
    const category = document.createElement('div');
    category.id = 'category';
    category.innerHTML = 'Category:<span></span>';

  // Append author and category to author and category section
    authorCategory.appendChild(author);
    authorCategory.appendChild(category);

  // Append all elements to widget content
    widgetContent.appendChild(widgetHeader);
    widgetContent.appendChild(articleTitle);
    widgetContent.appendChild(articleSummary);
    widgetContent.appendChild(authorCategory);

  // Create the article image
    const articleImage = document.createElement('div');
    articleImage.id = 'article-image';

  // Create the image element within the article image
    const image = document.createElement('img');
    image.src = './assets/images/test.png';
    image.alt = 'Article Image';

  // Append image to article image
    articleImage.appendChild(image);

  // Append widget content and article image to the news widget container
    newsWidgetContainer.appendChild(widgetContent);
    newsWidgetContainer.appendChild(articleImage);

  // Append the news widget container to the main section element
    newsWidgetSection.appendChild(newsWidgetContainer);
}

// Call the function to create the news widget
createNewsWidget();
