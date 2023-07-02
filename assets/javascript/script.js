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

  // Select the dropdown element
  var dropdown = document.getElementById("news-categories");

  // Select the element where you want to display the selected option
  var categoryElement = document.getElementById("h2-category");

  // Function to update the display based on the selected option
  function updateDisplay() {
    var selectedOption = dropdown.value; // Get the selected option's value
    categoryElement.textContent = selectedOption; // Update the display element with the selected option
    console.log(selectedOption);
  }

  // Link search button to news filters
  var searchTerm = document.getElementById('search-term').value;
  var dropdown = document.getElementById("news-categories");
  var selectedOption = dropdown.value; // Get the selected option's value
  var categorySelect;
  if (selectedOption == 'All Categories') {
    categorySelect = "";
  } else {
    categorySelect = 'section_name:' + selectedOption;
  }

  console.log(searchTerm);
  console.log(categorySelect);

  // var from = document.getElementById('from').value;
  // var to = document.getElementById('to').value;

  // Combine search criteria into a larger search function for the API call


  // Make an API request with the search term
  let apiKey = '0qKub7V4fhsw2VnnCiKqY4UL7fbeJPsg';

  var urlSearch = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm + '&fq=' + categorySelect + '&api-key=' + apiKey;
  console.log(urlSearch);

  // Make API request
  fetch(urlSearch)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      for (let n=0; n<10; n++) {
        var doc = data.response.docs[n];

        // Process the received data here
        // Access the snippet
        const snippet = doc.snippet;
        console.log('Snippet:', snippet);

        // Access the main headline
        const mainHeadline = doc.headline.main;
        console.log('Main Headline:', mainHeadline);

        // Access the source
        const source = doc.source;
        console.log('Source:', source);

        // Access the date
        const date = doc.pub_date;
        console.log('Date:', date);

        // Access the date
        const category = doc.section_name;
        console.log('Category:', category);

        // Access the author
        // const author = doc.byline.original;
        const author = doc.byline && doc.byline.original ? doc.byline.original.replace(/^By /, '') : 'N/A';
        console.log('Author:', author);

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
          newsSource.textContent = source;

          // Create the article date element
          const articleDate = document.createElement('div');
          articleDate.id = 'article-date';
          displayDate = date.match(/^\d{4}-\d{2}-\d{2}/)[n];
          console.log(displayDate); // Output: 2023-06-27
          articleDate.textContent = displayDate;

          // Append news source and article date to widget header
          widgetHeader.appendChild(newsSource);
          widgetHeader.appendChild(articleDate);

          // Create article title
          const articleTitle = document.createElement('div');
          articleTitle.id = 'article-title';
          articleTitle.textContent = mainHeadline;

          // Create article summary
          const articleSummary = document.createElement('div');
          articleSummary.id = 'article-summary';
          articleSummary.textContent = snippet;

          // Create author and category section
          const authorCategory = document.createElement('div');
          authorCategory.id = 'author-category';

          // Create author element within author and category section
          const authorName = document.createElement('div');
          authorName.id = 'author';
          authorName.innerHTML = '<b>Author:</b> ' + author.replace(/^By /, '');

          // Create category element within author and category section
          const categoryName = document.createElement('div');
          categoryName.id = 'category';
          categoryName.innerHTML = '<b>Category:</b> ' + category;

          // Append author and category to author and category section
          authorCategory.appendChild(authorName);
          authorCategory.appendChild(categoryName);

          // Append all elements to widget content
          widgetContent.appendChild(widgetHeader);
          widgetContent.appendChild(articleTitle);
          widgetContent.appendChild(articleSummary);
          widgetContent.appendChild(authorCategory);

          // Create the article image
          const articleImage = document.createElement('div');
          articleImage.id = 'article-image';

          // Create the image element within the article image
          // Use a try block - the multimedia might not be an array or the specific index might not be available
          let thumbnailLgUrl;
          try {
            const thumbnailLgLoc = doc.multimedia[19].url;
            thumbnailLgUrl = 'https://www.nytimes.com/'+thumbnailLgLoc;
          } catch (e) {
            console.log('Failed to access thumbnail URL:', e);
            thumbnailLgUrl = './assets/images/monkey-selfie'; // default thumbnail URL or leave it undefined
          } 
          const image = document.createElement('img');
          image.src = thumbnailLgUrl;
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
        updateDisplay();
      
      }
    })
.catch(error => console.log(error));  
}

function defaultNews() {

// Select the dropdown element
var dropdown = document.getElementById("news-categories");

// Select the element where you want to display the selected option
var categoryElement = document.getElementById("h2-category");

// Function to update the display for top news
function updateDisplay() {
  categoryElement.textContent = 'Top News This Week'; // Update the display element with the selected option
}

// Make an API request with the search term
let apiKey = '0qKub7V4fhsw2VnnCiKqY4UL7fbeJPsg';
var urlDefault = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=' + apiKey;
console.log(urlDefault);

// Make API request
fetch(urlDefault)
  .then(response => response.json())
  .then(data => {
    console.log(data);

    for (let n=0; n<20; n++) {
      doc = data.results[n];

      // Process the received data here
      // Access the snippet
      const snippet = doc.abstract;
      console.log('Snippet:', snippet);

      // Access the main headline
      const mainHeadline = doc.title;
      console.log('Main Headline:', mainHeadline);

      // Access the source
      const source = doc.source;
      console.log('Source:', source);

      // Access the date
      const date = doc.published_date;
      console.log('Date:', date);

      // Access the date
      const category = doc.section;
      console.log('Category:', category);

      // Access the author
      const author = doc.byline;
      console.log('Author:', author);

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
        newsSource.textContent = source;

        // Create the article date element
        const articleDate = document.createElement('div');
        articleDate.id = 'article-date';
        displayDate = date.match(/^\d{4}-\d{2}-\d{2}/)[n];
        console.log(displayDate); // Output: 2023-06-27
        articleDate.textContent = displayDate;

        // Append news source and article date to widget header
        widgetHeader.appendChild(newsSource);
        widgetHeader.appendChild(articleDate);

        // Create article title
        const articleTitle = document.createElement('div');
        articleTitle.id = 'article-title';
        articleTitle.textContent = mainHeadline;

        // Create article summary
        const articleSummary = document.createElement('div');
        articleSummary.id = 'article-summary';
        articleSummary.textContent = snippet;

        // Create author and category section
        const authorCategory = document.createElement('div');
        authorCategory.id = 'author-category';

        // Create author element within author and category section
        const authorName = document.createElement('div');
        authorName.id = 'author';
        authorName.innerHTML = '<b>Author:</b> ' + author.replace(/^By /, '');

        // Create category element within author and category section
        const categoryName = document.createElement('div');
        categoryName.id = 'category';
        categoryName.innerHTML = '<b>Category:</b> ' + category;

        // Append author and category to author and category section
        authorCategory.appendChild(authorName);
        authorCategory.appendChild(categoryName);

        // Append all elements to widget content
        widgetContent.appendChild(widgetHeader);
        widgetContent.appendChild(articleTitle);
        widgetContent.appendChild(articleSummary);
        widgetContent.appendChild(authorCategory);

        // Create the article image
        const articleImage = document.createElement('div');
        articleImage.id = 'article-image';

        // Create the image element within the article image
        // Use a try block - the multimedia might not be an array or the specific index might not be available
        let thumbnailUrl;
        try {
          thumbnailUrl = data.results[n].media[0].media-metadata[0].url;
          console.log("Thumbnail: " + thumbnailUrl);
        } catch (e) {
          console.log('Failed to access thumbnail URL:', e);
          thumbnailUrl = './assets/images/monkey-selfie.jpg'; // default thumbnail URL or leave it undefined
        } 
        const image = document.createElement('img');
        image.src = thumbnailUrl;
        image.alt = 'Missing Image';
        console.log(thumbnailUrl)

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
      updateDisplay();
    }
  })
.catch(error => console.log(error));  
}

// Call searchNews() on page load with the default URL
$(document).ready(function() {
  defaultNews();
});

// hovering over links shows actual link url
let news_source = $(document.getElementById("our-team-container")).find($("[id=news-source]"));
let article_date = $(document.getElementById("our-team-container")).find($("[id=article-date]"));

$(news_source).hover(function() {
$(this).text($(this).attr("href"));
}, function() {
$(this).text("LinkedIn");
});

$(article_date).hover(function() {
$(this).text($(this).attr("href"));
}, function() {
$(this).text("GitHub");
});  