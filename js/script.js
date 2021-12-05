'use strict';

const templates = {
  articleLink: Handlebars.compile(
    document.querySelector('#template-article-link').innerHTML
  ),
  tagLink: Handlebars.compile(
    document.querySelector('#template-tag-link').innerHTML
  ),
  authorLink: Handlebars.compile(
    document.querySelector('#template-author-link').innerHTML
  ),
  tagCloudLink: Handlebars.compile(
    document.querySelector('#template-tag-cloud-link').innerHTML
  ),
  authorListLink: Handlebars.compile(
    document.querySelector('#template-author-list-link').innerHTML
  ),
};

const opts = {
  articleSelector: '.post',
  titleListSelector: '.titles',
  titleSelector: '.post-title',
  articleTagsSelector: '.post-tags .list',
  articleAuthorSelector: '.post-author',
  tagsListSelector: '.tags.list',
  cloudClassCount: 5,
  cloudClassPrefix: 'tag-size-',
  authorsListSelector: '.authors.list',
};

function titleClickHandler(event) {
  event.preventDefault();
  const clickedElement = this;
  //console.log('Link was clicked!');

  /* [DONE] remove class 'active' from all article links  */
  const activeLinks = document.querySelectorAll('.titles a.active');

  for (let activeLink of activeLinks) {
    activeLink.classList.remove('active');
  }

  /* [DONE] add class 'active' to the clicked link */
  clickedElement.classList.add('active');

  /* [DONE] remove class 'active' from all articles */

  const activeArticles = document.querySelectorAll('.posts article.active');

  for (let activeArticle of activeArticles) {
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

function generateTitleLinks(customSelector = '') {
  console.log(`custom selector: ${customSelector}`);
  /* remove contents of titleList */
  const titleList = document.querySelector(opts.titleListSelector);
  titleList.innerHTML = '';

  /* find all the articles and save them to variable: articles */
  const articles = document.querySelectorAll(
    opts.articleSelector + customSelector
  );
  let html = '';
  //console.log(articles);
  //console.log(opts.articleSelector + customSelector);

  /* for each article */
  for (let article of articles) {
    /* get the article id */
    const articleId = article.getAttribute('id');
    //console.log(articleId);

    /* find the title element */
    /* get the title from the title element */
    const articleTitle = article.querySelector(opts.titleSelector).innerHTML;
    //console.log(articleTitle);

    /* create HTML of the link */
    //const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
    const linkHTMLData = { id: articleId, title: articleTitle };
    const linkHTML = templates.articleLink(linkHTMLData);
    //console.log(linkHTML);

    /* insert link into titleList */
    html = html + linkHTML;
    //console.log(html);
  }
  titleList.innerHTML = html;
  const links = document.querySelectorAll('.titles a');

  for (let link of links) {
    link.addEventListener('click', titleClickHandler);
  }
}
generateTitleLinks();

/***************************************    Tag links    ******************************************/

function calculateTagsParams(tags) {
  /* create a new object params with min and max */
  const params = { max: 0, min: 999999 };
  /* START LOOP: for each tag */
  for (let tag in tags) {
    console.log(`${tag} is used ${tags[tag]} times`);

    /* Find max value of tags[tag]*/
    params.max = Math.max(tags[tag], params.max);

    /* Find min value of tags[tag]*/
    params.min = Math.min(tags[tag], params.min);
  }
  /* return object params */
  return params;
}

function generateTags() {
  /* [NEW] create a new variable allTags with an empty object */
  let allTags = {};

  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find tags wrapper */
    const tagsWrapper = article.querySelector(opts.articleTagsSelector);
    //console.log(tagsWrapper);

    /* make html variable with empty string */
    let html = '';

    /* get tags from data-tags attribute */
    const articleTags = article.getAttribute('data-tags');

    /* split tags into array */
    const articleTagsArray = articleTags.split(' ');

    /* START LOOP: for each tag */
    for (let tag of articleTagsArray) {
      /* generate HTML of the link */
      //const linkHTML = `<li><a href="#tag-${tag}">${tag}</a></li>`;

      const linkHTMLData = { tagName: tag };
      const linkHTML = templates.tagLink(linkHTMLData);

      /* add generated code to html variable */
      html = html + linkHTML;

      /* [NEW] check if this link is NOT already in allTags */
      if (!Object.prototype.hasOwnProperty.call(allTags, tag)) {
        /* [NEW] add generated code to object allTags */
        allTags[tag] = 1;
      } else {
        allTags[tag] += 1;
      }
      /* END LOOP: for each tag */
    }
    /* insert HTML of all the links into the tags wrapper */
    tagsWrapper.innerHTML = html;
    //console.log(tagsWrapper);
    /* END LOOP: for every article: */
  }

  /* [NEW] find list of tags in right column */
  const tagList = document.querySelector(opts.tagsListSelector);

  /* [NEW] add html from allTags to tagList */
  console.log(allTags);

  /* [NEW] create new const - tagsParams */
  const tagsParams = calculateTagsParams(allTags);
  console.log('tagsParams:', tagsParams);

  /* [NEW] Create variable for all links HTML code */
  //let allTagsHTML = '';
  const allTagsData = { tags: [] };

  /* [NEW] START LOOP: for each tag in allTags*/
  for (let tag in allTags) {
    //const tagLinkHTML = `<li><a href="#tag-${tag}" class="${calculateTagClass(allTags[tag], tagsParams)}">${tag}</a></li>`;
    //console.log('tagLinkHTML:', tagLinkHTML);
    allTagsData.tags.push({
      tag: tag,
      count: allTags[tag],
      className: calculateTagClass(allTags[tag], tagsParams),
    });
    /*END LOOP: for each tag in allTags*/
    //console.log(allTagsHTML);
  }
  /* [NEW] add HTML from allTagsHTML to tagList*/
  tagList.innerHTML = templates.tagCloudLink(allTagsData);
  console.log(allTagsData);
  console.log(tagList);
}

function calculateTagClass(count, params) {
  const normalizedCount = count - params.min;
  const normalizedMax = params.max - params.min;
  const percentage = normalizedCount / normalizedMax;
  const classNumber = Math.floor(percentage * (opts.cloudClassCount - 1) + 1);
  const className = opts.cloudClassPrefix + classNumber;
  console.log(className);
  return className;
}
generateTags();

function tagClickHandler(event) {
  /* prevent default action for this event */
  event.preventDefault();

  /* make new constant named "clickedElement" and give it the value of "this" */
  const clickedElement = this;
  console.log('Tag link was clicked!');

  /* make a new constant "href" and read the attribute "href" of the clicked element */
  const href = clickedElement.getAttribute('href');
  console.log(href);

  /* make a new constant "tag" and extract tag from the "href" constant */
  const tag = href.replace('#tag-', '');
  console.log(tag);

  /* find all tag links with class active */
  const activeLinks = document.querySelectorAll('a.active[href^="#tag-"]');

  /* START LOOP: for each active tag link */
  for (let activeLink of activeLinks) {
    /* remove class active */
    activeLink.classList.remove('active');
    /* END LOOP: for each active tag link */
  }
  //console.log('class active removed');

  /* find all tag links with "href" attribute equal to the "href" constant */
  const tagLinks = document.querySelectorAll(`a[href="${href}"]`);

  /* START LOOP: for each found tag link */
  for (let tagLink of tagLinks) {
    /* add class active */
    tagLink.classList.add('active');
    /* END LOOP: for each found tag link */
  }
  //console.log('class active added');

  /* execute function "generateTitleLinks" with article selector as argument */
  generateTitleLinks(`[data-tags~="${tag}"]`);
  //console.log('function generateTitleLinks called');
}

function addClickListenersToTags() {
  /* find all links to tags */
  const tagLinks = document.querySelectorAll('.post-tags a, .tags a');

  /* START LOOP: for each link */
  for (let tagLink of tagLinks) {
    /* add tagClickHandler as event listener for that link */
    tagLink.addEventListener('click', tagClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToTags();

/********************************    Author Links    **************************************/

function generateAuthors() {
  /* find all articles */
  const articles = document.querySelectorAll(opts.articleSelector);

  /* create object witch all authors and numbers */
  const allAuthors = {};

  /* START LOOP: for every article: */
  for (let article of articles) {
    /* find author's wrapper */
    const authorWrapper = article.querySelector(opts.articleAuthorSelector);

    /* make html variable with empty string */
    let html = '';

    /* get authors from data-author attribute */
    const articleAuthor = article.getAttribute('data-author');

    /* check if this author is NOT already in allAuthors */
    //if (!Object.prototype.hasOwnProperty.call(allAuthors, articleAuthor)) {
    if (!allAuthors[articleAuthor]) {
      /* add generated code to object allAuthors */
      allAuthors[articleAuthor] = 1;
    } else {
      allAuthors[articleAuthor] += 1;
    }

    /* generate HTML of the link */
    const linkHTMLData = { authorName: articleAuthor };
    const linkHTML = templates.authorLink(linkHTMLData);

    /* add generated code to html variable */
    html = html + linkHTML;

    /* insert HTML of all the links into the tags wrapper */
    authorWrapper.innerHTML = html;

    /* END LOOP: for every article: */
  }
  /* find list of authors in right column */
  const authorList = document.querySelector(opts.authorsListSelector);

  /*create object for author links data */
  const allAuthorsData = { authors: [] };

  /* START LOOP: for each author in allAuthors*/
  for (let author in allAuthors) {
    allAuthorsData.authors.push({
      author: author,
      count: allAuthors[author],
    });
    /*END LOOP: for each author in allAuthors*/
  }
  /* add HTML from allAuthorsHTML to authorList*/
  authorList.innerHTML = templates.authorListLink(allAuthorsData);
  console.log(authorList);
}
generateAuthors();

function authorClickHandler(event) {
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
  generateTitleLinks(`[data-author="${author}"]`);
}

function addClickListenersToAuthors() {
  /* find all links to tags */
  const authorsLinks = document.querySelectorAll('.post-author a, .authors a');

  /* START LOOP: for each link */
  for (let authorLink of authorsLinks) {
    /* add tagClickHandler as event listener for that link */
    authorLink.addEventListener('click', authorClickHandler);
    /* END LOOP: for each link */
  }
}
addClickListenersToAuthors();
