// Date Picker Functionality
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

// Initialize variables
var doc;
let pageNumber = 0;

// Make an API call for today's news
function todaysNews() {
  // Function to update the display for top news
  var categoryElement = document.getElementById("h2-category");
  function updateDisplay() {
    categoryElement.textContent = 'Top News Today'; // Update the display element with the selected option
  }

  // Make an API request with the search term
  let apiKey = '0qKub7V4fhsw2VnnCiKqY4UL7fbeJPsg';
  var urlTodaysNews = 'https://api.nytimes.com/svc/news/v3/content/all/all.json?api-key=' + apiKey;
  console.log(urlTodaysNews);

  // Make API request
  fetch(urlTodaysNews)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      for (let n=0; n<20; n++) {
        doc = data.results[n];
        populateArticles();
        updateDisplay();
      }
    })
    .catch(error => console.log(error));
}

// Make an API call for the most popular news for the last week
function topNews7() {
  // Function to update the display for top news
  var categoryElement = document.getElementById("h2-category");
  function updateDisplay() {
    categoryElement.textContent = 'Trending News from this Week'; // Update the display element with the selected option
  }

  // Make an API request with the search term
  let apiKey = '0qKub7V4fhsw2VnnCiKqY4UL7fbeJPsg';
  var urlTopNews7 = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/7.json?api-key=' + apiKey;
  console.log(urlTopNews7);

  // Make API request
  fetch(urlTopNews7)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      for (let n=0; n<20; n++) {
        doc = data.results[n];
        populateArticles();
        updateDisplay();
      }
    })
    .catch(error => console.log(error));
}

// Make an API call for the most popular news for the last month
function topNews30() {
  // Function to update the display for top news
  var categoryElement = document.getElementById("h2-category");
  function updateDisplay() {
    categoryElement.textContent = 'Trending News from this Month'; // Update the display element with the selected option
  }

  // Make an API request with the search term
  let apiKey = '0qKub7V4fhsw2VnnCiKqY4UL7fbeJPsg';
  var urlTopNews30 = 'https://api.nytimes.com/svc/mostpopular/v2/viewed/30.json?api-key=' + apiKey;
  console.log(urlTopNews30);

  // Make API request
  fetch(urlTopNews30)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      for (let n=0; n<20; n++) {
        doc = data.results[n];
        populateArticles();
        updateDisplay();
      }
    })
    .catch(error => console.log(error));
}

// Make an API call for the most popular news for the last month
function newsapi() {
  // Function to update the display for top news
  var categoryElement = document.getElementById("h2-category");
  function updateDisplay() {
    categoryElement.textContent = 'News API'; // Update the display element with the selected option
  }

  // Make an API request with the search term
  let apiKey = '09e64df775b241588fad642e27dd95c6';
  const sortBy = 'publishedAt';
  const category = "general";
  const urlNewsApi = 'https://newsapi.org/v2/top-headlines?country=us&category='+category+'&sortBy='+sortBy+'&apiKey='+apiKey;
  console.log(newsapi);

  // Make API request
  fetch(urlNewsApi)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      for (let n=0; n<100; n++) {
      doc = data.articles[n];
        populateArticles();
        updateDisplay();
      }
  })
  .catch(error => console.log(error));
}


// Build widgets and populate API pulled articles onto the site
function populateArticles() {

  // Access the main headline
  let title;
  if (doc.title) {
    title = doc.title;
  } else {
    title = doc.headline.main;
  }
  console.log('Title:', title.substring(0,50));

  // Access the summary
  let summary;
  if (doc.abstract) {
    summary = doc.abstract;
    if(doc.title.length > 70 || doc.abstract.length > 150) {
      summary = doc.abstract.substring(0, 100) + " ...(read more).";
    };
  };

  /*
  if (summary) {
    console.log('Summary:', summary.substring(0,50)+'...');
  } else {
    console.log('Summary undefined');
  }*/
  
  // Access the source
  let source;
  if (doc.source.name) {
    source = doc.source.name;
  } else {
    source = doc.source;
  }
  console.log('Source:', source);

  // Access the date
  let date;
  if (doc.published_date) {
    date = dayjs(doc.published_date).format('MMM D, YYYY');
  } else if (doc.pub_date) {
    date = dayjs(doc.publishedAt).format('MMM D, YYYY');
  } else {
    date = dayjs(doc.publishedAt).format('MMM D, YYYY');
  }
  console.log('Date:', date);

  // Access the category
  let category;
  if (doc.section) {
    category = doc.section
  } else { 
    category = doc.section_name;
  }
  console.log('Category:', category);

  // Access the author
  let author;
  if (doc.author) {
    author = doc.author;
  } else {
  author = doc.byline && doc.byline.original ? doc.byline.original.replace(/^By /, '') : 'N/A';
  }
  console.log('Author:', author);

  // Access the URL
  let url;
  url = doc.url
  console.log('url:', url)
  
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
    articleDate.textContent = date;

    // Append news source and article date to widget header
    widgetHeader.appendChild(newsSource);
    widgetHeader.appendChild(articleDate);

    // Create article title
    const articleTitle = document.createElement('a');
    articleTitle.id = 'article-title';
    articleTitle.textContent = title;
    articleTitle.href = url;
    articleTitle.target = "_blank"; // this opens the article up in a new page

    // Create article summary
    const articleSummary = document.createElement('div');
    articleSummary.id = 'article-summary';
    articleSummary.textContent = summary;

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

    let thumbnailUrl;
    
    try {
        thumbnailUrl = doc.urlToImage;
    } catch (e) {
        // console.log('Failed to access thumbnail URL from media:', e);
        thumbnailUrl = undefined;  // setting it to undefined for the next try block
    }
    if (!thumbnailUrl) {
        try {
            thumbnailUrl = 'https://www.nytimes.com/'+doc.multimedia[19].url;
        } catch (e) {
            // console.log('Failed to access thumbnail URL from multimedia:', e);
            thumbnailUrl = undefined; // setting it to undefined for the next try block
        }
    }
    if (!thumbnailUrl) {
        try {
            thumbnailUrl = doc.multimedia[3].url;
        } catch (e) {
            // console.log('Failed to access thumbnail URL from multimedia:', e);
            thumbnailUrl = './assets/images/monkey-selfie.jpg'; // default thumbnail URL
        }
    }
    if (!thumbnailUrl) {
        try {
            thumbnailUrl = doc.media[0]['media-metadata'][2].url;
        } catch (e) {
            // console.log('Failed to access thumbnail URL from media:', e);
            thumbnailUrl = undefined;  // setting it to undefined for the next try block
        }
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
  createNewsWidget()
}

// Search news using search filters
function searchNews() {

  // Clear the news results container at the start of each search
  const newsWidgetSection = document.getElementById('news-results');
  while (newsWidgetSection.firstChild) {
      newsWidgetSection.firstChild.remove();
  }

  // Function to update the display based on the selected option
  var dropdown = document.getElementById("news-categories");
  var categoryElement = document.getElementById("h2-category");
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
  const fromEl = document.getElementById('from').value;
  const toEl = document.getElementById('to').value;
  
  let from; //= dayjs(fromEl).format('YYYYMMDD');
  let to; //= dayjs(toEl).format('YYYYMMDD');
  if (fromEl == "") {
    from = dayjs().subtract(30,'day').format('YYYYMMDD');
  } else {
    from = dayjs(fromEl).format('YYYYMMDD');
  }
  if (toEl == "") {
    to = dayjs().format('YYYYMMDD');
  } else {
    to = dayjs(fromEl).format('YYYYMMDD');
  }

  console.log(searchTerm);
  console.log(categorySelect);
  console.log(from);
  console.log(to);

  // Make an API request with the search term
  let apiKey = '0qKub7V4fhsw2VnnCiKqY4UL7fbeJPsg';

  var urlSearch = 'https://api.nytimes.com/svc/search/v2/articlesearch.json?q=' + searchTerm + '&fq=' + categorySelect + '&begin_date=' + from + '&end_date=' + to + '&api-key=' + apiKey;
  console.log(urlSearch);

  // Make API request
  fetch(urlSearch)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      for (let n=0; n<10; n++) {
        doc = data.response.docs[n];
        populateArticles()
        updateDisplay();
      }
    })
  .catch(error => console.log(error));  
}

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