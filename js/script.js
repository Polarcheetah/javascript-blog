'use strict';

function titleClickHandler(event){
    event.preventDefault();
    const clickedElement = this;
    console.log('Link was clicked!');
    
    /* [DONE] remove class 'active' from all article links  */

    const activeLinks = document.querySelectorAll('.titles a.active');

    for(let activeLink of activeLinks){
    activeLink.classList.remove('active');
    }
  
    /* [DONE] add class 'active' to the clicked link */

    console.log('clickedElement:', clickedElement);
    clickedElement.classList.add('active');

    /* [DONE] remove class 'active' from all articles */

    const activeArticles = document.querySelectorAll('.posts article.active');
    
    for(let activeArticle of activeArticles){
    activeArticle.classList.remove('active');
    }

    /* [DONE]get 'href' attribute from the clicked link */

        const articleSelector = clickedElement.getAttribute("href");
        console.log('article selector: ', articleSelector);
       
    /* [DONE]find the correct article using the selector (value of 'href' attribute) */

        const targetArticle = document.querySelector(articleSelector);
        console.log(targetArticle);
    
    /* [DONE]add class 'active' to the correct article */
    
    targetArticle.classList.add('active');
    
  
  }

/**********************************************************************************/
  const optArticleSelector = '.post';
  const optTitleSelector = '.post-title';
  const optTitleListSelector = '.titles';

  function generateTitleLinks(){
    console.log('function generateTitleLinks was called' );

  /* remove contents of titleList */
    const titleList = document.querySelector(optTitleListSelector);
    titleList.innerHTML = '';
    
      //document.getElementsByClassName('titles').innerHTML = '';// ???

  /* find all the articles and save them to variable: articles */
    const articles = document.querySelectorAll(optArticleSelector);
    let html = '';

  /* for each article */        
    for(let article of articles){

    /* get the article id */
      const articleId = article.getAttribute("id");
      console.log(articleId);

    /* find the title element */
    /* get the title from the title element */
      const articleTitle = article.querySelector(optTitleSelector).innerHTML;
      console.log(articleTitle);

    /* create HTML of the link */
      const linkHTML = `<li><a href="#${articleId}"><span>${articleTitle}</span></a></li>`;
      console.log(linkHTML);

    /* insert link into titleList */
      html = html + linkHTML;
      console.log(html);
    }
    //document.getElementsByClassName('titles').innerHTML = html;// ?? to nie dziala
    
    //document.getElementById('title-list').innerHTML = html; ?? to dziala
    titleList.innerHTML = html;
    const links = document.querySelectorAll('.titles a');

    for(let link of links){
    link.addEventListener('click', titleClickHandler);
    }
  }
  generateTitleLinks();