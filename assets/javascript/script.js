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

let apiSelector = document.getElementById('newsSearchButton')
apiSelector.addEventListener('click', function() {
  let dropdown = document.getElementById("news-categories");
  let selectedOption = dropdown.value; // Get the selected option's value
  
  if (selectedOption === 'All Categories') {
    searchNewsapi();
  } else if (selectedOption != 'All Categories') {
    searchNews();
  } 
});


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

// Search news using search filters
function searchNewsapi() {

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
    categorySelect = "general";
  } else {
    categorySelect = 'section_name:' + selectedOption;
  }
  const fromEl = document.getElementById('from').value;
  const toEl = document.getElementById('to').value;
  
  let from; //= dayjs(fromEl).format('YYYYMMDD');
  let to; //= dayjs(toEl).format('YYYYMMDD');
  if (fromEl == "") {
    from = dayjs().subtract(30,'day').format('YYYY-MM-DD');
  } else {
    from = dayjs(fromEl).format('YYYY-MM-DD');
  }
  if (toEl == "") {
    to = dayjs().format('YYYY-MM-DD');
  } else {
    to = dayjs(fromEl).format('YYYY-MM-DD');
  }

  console.log(searchTerm);
  console.log(categorySelect);
  console.log(from);
  console.log(to);

  // Make an API request with the search term
  let apiKey = '09e64df775b241588fad642e27dd95c6';
  const sortBy = 'publishedAt';
  const category = selectedOption;

  const urlsearchNewsapi = 'https://newsapi.org/v2/everything?q='+searchTerm+'&sortBy='+sortBy+'&from='+from+'&to='+to+'&apiKey='+apiKey;
  console.log(urlsearchNewsapi);

  // Make API request
  fetch(urlsearchNewsapi)
    .then(response => response.json())
    .then(data => {
      console.log(data);

      noResults = document.getElementById('no-results')
      if (data.totalResults == 0) {
        noResults.textContent = 'No results were found for "' + searchTerm + '" within "' + selectedOption + '" from ' + from + ' to ' + to
        categoryElement.textContent = "No Results Found"
      } else {
        for (let n=0; n<100; n++) {
          doc = data.articles[n];
          populateArticles()
          updateDisplay();
        }
      }
    })
  .catch(error => console.log(error));  
}


// Build widgets and populate API pulled articles onto the site
function populateArticles() {

  // Access the main headline
  let title;
  /*if(doc.title == null || doc.headline.main == null) {
    console.log("missing title dumbass");
    title = "aint got no title";
    return;
  };*/

  /*if (doc.title) {
    title = doc.title;
  } else if (doc.headline.main) {
    title = doc.headline.main;
  } else {
    title = 'Missing Title'
  }
  console.log('Title:', title);*/

  // sets title as doc.title or headline
  if(getSafe(() => doc.title) == undefined 
  && getSafe(() => doc.headline) == undefined) {
    title = "No title found";
  } else {
    if(getSafe(() => doc.title) != undefined) {
      title = doc.title;
    }
  
    if(getSafe(() => doc.headline) != undefined) {
      title = doc.headline.main;
    }
  }



  // Access the summary
  let summary;

  if (getSafe(() => doc.abstract) == undefined 
  && getSafe(() => doc.snippet) == undefined 
  && getSafe(() => doc.description) == undefined) {
    summary = "No abstract found";
  } else {
    if(getSafe(() => doc.abstract) != undefined) {
      summary = doc.abstract;
      if(title.length > 70 || summary > 150) {
        summary = doc.abstract.substring(0, 100) + " ...";
      };
    }

    if(getSafe(() => doc.snippet) != undefined) {
      summary = doc.snippet;
      if(title.length > 70 || summary > 150) {
        summary = doc.snippet.substring(0, 100) + " ...";
      };
    }

    if(getSafe(() => doc.description) != undefined) {
      summary = doc.description;
      if(doc.title.length > 70 || doc.description.length > 150) {
        summary = doc.description.substring(0, 100) + " ...";
      };
    }
  };
  
  // Access the source
  let source;
  if(getSafe(() => doc.source) == undefined 
  && getSafe(() => doc.source.name) == undefined) {
    source = "No source found";
  } else {
    if(getSafe(() => doc.source) != undefined) {
      source = doc.source;
    }
    if(getSafe(() => doc.source.name) != undefined) {
      source = doc.source.name;
    }
  }

  // Access the date
  let date;
  if(getSafe(() => doc.published_date) == undefined 
  && getSafe(() => doc.pub_date) == undefined 
  && getSafe(() => doc.publishedAt) == undefined) {
    date = "Date not found";
  } else {
    if(getSafe(() => doc.published_date) != undefined) {
      date = dayjs(doc.published_date).format('MMM D, YYYY');
    }
    if(getSafe(() => doc.pub_date) != undefined) {
      date = dayjs(doc.pub_date).format('MMM D, YYYY');
    }
    if(getSafe(() => doc.publishedAt) != undefined) {
      date = dayjs(doc.publishedAt).format('MMM D, YYYY');
    }
  }

  // Access the category
  let category;
  if(getSafe(() => doc.section) == undefined) {
    category = "N/A";
  } else {
    if(getSafe(() => doc.section) != undefined) {
      category = doc.section;
    }
    if(getSafe(() => doc.section.name) != undefined) {
      category = doc.section.name;
    }
  }

  // Access the author
  let author;

//   if (doc.author) {
//     author = doc.author;
//   } else if (doc.byline && doc.byline.original) {
//     doc.byline.original.replace(/^By /, '');
//   }

  if(getSafe(() => doc.author) == undefined 
  && getSafe(() => doc.byline) == undefined 
  && getSafe(() => doc.byline.original) == undefined) {
    author = "N/A";
  } else {
    if(getSafe(() => doc.author) != undefined) {
      author = doc.author;
    }

    if(getSafe(() => doc.byline) != undefined) {
      author = doc.byline.replace(/^By /, '');
    }

    if(getSafe(() => doc.byline.original) != undefined) {
      author = doc.byline.original.replace(/^By /, '');
    }
  }

  // if (doc.author) {
  //   author = doc.author;
  // } else if (doc.byline.original) {
  //   author = doc.byline.original.replace(/^By /, '');
  // } else {
  //   author =  doc.byline.replace(/^By /, '');
  // }

//   try {
//     author = doc.author;
// } catch (e) {
//     console.log('Failed to access author:', e);
//     author = undefined;  
// }

// if (!author) {
//     try {
//         author = doc.byline.original.replace(/^By /, '');
//     } catch (e) {
//         console.log('Failed to access author:', e);
//         author = undefined; 
//     }
// }

// if (!author) {
//     try {
//       author =  doc.byline.replace(/^By /, '')
//     } catch (e) {
//         console.log('Failed to access author:', e);
//         author = 'unk'; 
//     }
// }


  // Access the URL
  let url;

  if(getSafe(() => doc.url) == undefined) {
    console.log("No url found")
    return;
  } else {
    url = doc.url;
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

    // Mark this down!!!!
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

    /*try {
        thumbnailUrl = doc.urlToImage;
    } catch (e) {
        console.log('Failed to access thumbnail URL from media:', e);
        thumbnailUrl = undefined;  
    }

    if (!thumbnailUrl) {
        try {
            thumbnailUrl = 'https://www.nytimes.com/' + doc.multimedia[19].url;
        } catch (e) {
            console.log('Failed to access thumbnail URL from multimedia:', e);
            thumbnailUrl = undefined;
        }
    }

    if (!thumbnailUrl) {
        try {
            thumbnailUrl = doc.media[0]['media-metadata'][2].url; // NYT daily
        } catch (e) {
            console.log('Failed to access thumbnail URL from media:', e);
            thumbnailUrl = undefined; 
        }
    }
  
    if (!thumbnailUrl) {
      try {
          thumbnailUrl = doc.multimedia[3].url;
      } catch (e) {
          console.log('Failed to access thumbnail URL from multimedia:', e);
          thumbnailUrl = './assets/images/monkey-selfie.jpg'; // default thumbnail URL
      }
  }*/

      // retrieves a thumbnail
    if(getSafe(() => doc.urlToImage) == undefined 
      && getSafe(() => 'https://www.nytimes.com/' + doc.multimedia[19]) == undefined 
      && getSafe(() => doc.multimedia[3]) == undefined
      && getSafe(() => doc.media[0]['media-metadata'][2].url) == undefined) {
        thumbnailUrl = './assets/images/monkey-selfie.jpg';
    } else {
      if(getSafe(() => doc.urlToImage) != undefined) {
        thumbnailUrl = doc.urlToImage;
      }

      if(getSafe(() => doc.multimedia[3].url) != undefined) {
        thumbnailUrl = doc.multimedia[3].url;
      }

      if(getSafe(() => 'https://www.nytimes.com/' + doc.multimedia[19].url) != undefined) {
        thumbnailUrl = 'https://www.nytimes.com/' + doc.multimedia[19].url;
      }

      if(getSafe(() => doc.media[0]['media-metadata'][2].url) != undefined) {
        thumbnailUrl = doc.media[0]['media-metadata'][2].url;
      }
    }

    const image = document.createElement('img');
    image.src = thumbnailUrl;
    image.alt = 'Missing Image';

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


      noResults = document.getElementById('no-results')
      if (data.response.meta.hits == 0) {
        noResults.textContent = 'No results were found for "' + searchTerm + '" within "' + selectedOption + '" from ' + from + ' to ' + to
        categoryElement.textContent = "No Results Found"
      } else {
        for (let n=0; n<10; n++) {
          doc = data.response.docs[n];
          populateArticles()
          updateDisplay();
        }
      }
    })
  .catch(error => console.log(error));  
}


// try catch helper function catches undefined attributes from results
function getSafe(fn, defaultVal) {
  try {
    return fn();
  } catch (e) {
    return defaultVal;
  }
};

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