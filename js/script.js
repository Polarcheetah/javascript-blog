'use strict';

function titleClickHandler(event){
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');
    
  /* [DONE] remove class 'active' from all article links  */

  const activeLinks = document.querySelectorAll('.titles a.active');

  for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
  }
  
  /* [DONE] add class 'active' to the clicked link */

  //console.log('clickedElement:', clickedElement);
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');
    
  for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
  }

  /* [DONE]get 'href' attribute from the clicked link */

  const articleSelector = clickedElement.getAttribute('href');
  //console.log('article selector: ', articleSelector);
       
  /* [DONE]find the correct article using the selector (value of 'href' attribute) */

  const targetArticle = document.querySelector(articleSelector);
  //console.log(targetArticle);
    
  /* [DONE]add class 'active' to the correct article */
    
  targetArticle.classList.add('active');  
}

/**********************************************************************************/
const optArticleSelector = '.post';
const optTitleSelector = '.post-title';
const optTitleListSelector = '.titles';
const optArticleTagsSelector = '.post-tags .list';
const optArticleAuthorSelector = '.post-author';
const optTagsListSelector = '.tags.list';

function generateTitleLinks(customSelector = ''){
  console.log(`custom selector: ${customSelector}`);
  /* remove contents of titleList */
  const titleList = document.querySelector(optTitleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(optArticleSelector + customSelector);
  let html = '';
  //console.log(articles);
  //console.log(optArticleSelector + customSelector);

  /* for each article */        
  for(let article of articles){
    /* get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(optTitleSelector).innerHTML;
    //console.log(articleTitle);

    /* create HTML of the link */
    const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    //console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
    //console.log(html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for(let link of links){
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

/***************************************    Tag links    ******************************************/
function generateTags(){
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = [];

  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);

  /* START LOOP: for every article: */
  for (let article of articles){
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(optArticleTagsSelector);
    //console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');
    
    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');
    
    /* START LOOP: for each tag */
    for (let tag of articleTagsArray){
      /* generate HTML of the link */
      const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;
      
      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if(allTags.indexOf(linkHTML) == -1){
        /* [NEW] add generated code to array allTags */
        allTags.push(linkHTML);
      }

    /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    //console.log(tagsWrapper);
  /* END LOOP: for every article: */
  }
  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector('.tags');

  /* [NEW] add html from allTags to tagList */
  tagList.innerHTML = allTags.join(' ');
  console.log(`allTags: ${allTags}`);
}
generateTags();


function tagClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('Tag link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  //console.log(tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks){
    /* remove class active */
    activeLink.classList.remove('active'); 
  /* END LOOP: for each active tag link */
  }
  //console.log('class active removed');

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks){
    /* add class active */
    tagLink.classList.add('active'); 
  /* END LOOP: for each found tag link */
  }
  //console.log('class active added');

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);
  //console.log('function generateTitleLinks called');
}


function addClickListenersToTags(){
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks){
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToTags();

/********************************    Author Links    **************************************/

function generateAuthors(){
  /* find all articles */
  const articles = document.querySelectorAll(optArticleSelector);
  //console.log(articles);

  /* START LOOP: for every article: */
  for (let article of articles){
    /* find author's wrapper */
    const authorWrapper = article.querySelector(optArticleAuthorSelector);
    ///console.log(authorWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');
    //console.log(articleAuthor);

    /* generate HTML of the link */
    const linkHTML = `<a href="#author-${articleAuthor}">${articleAuthor}</a>`;
    //console.log(linkHTML);

    /* add generated code to html variable */
    html = html + linkHTML;
    //console.log(html);

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;
    //console.log(authorWrapper);
  /* END LOOP: for every article: */
  }
}
generateAuthors();

function authorClickHandler(event){
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  //console.log('Author link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  //console.log(href);

  /* make a new constant "author" and extract tag from the "href" constant */
  const author = href.replace('#author-', '');
  //console.log(author);

  /* execute function "generateTitleLinks" with article selector as argument */
  //console.log('[data-author="' + author + '"]');
  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToAuthors(){
  /* find all links to tags */
  const authorsLinks = document.querySelectorAll('.post-author a');

  /* START LOOP: for each link */
  for (let authorLink of authorsLinks){
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
  /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();



