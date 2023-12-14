"use strict";

// This is the global list of the stories, an instance of StoryList
let storyList;

/** Get and show stories when site first loads. */

async function getAndShowStoriesOnStart() {
  storyList = await StoryList.getStories();
  $storiesLoadingMsg.remove();
  putStoriesOnPage();
}

/**
 * A render method to render HTML for an individual Story instance
 * - story: an instance of Story
 *
 * Returns the markup for the story.
 */

function generateStoryMarkup(story) {
  // console.debug("generateStoryMarkup", story);

  const hostName = story.getHostName();

  return $(`
      <li id="${story.storyId}">
        <a href="${story.url}" target="a_blank" class="story-link">
          ${story.title}
        </a>
        <small class="story-hostname">(${hostName})</small>
        <small class="story-author">by ${story.author}</small>
        <small class="story-user">posted by ${story.username}</small>
      </li>
    `);
  
}

/** Gets list of stories from server, generates their HTML, and puts on page. */

function putStoriesOnPage() {
  console.debug("putStoriesOnPage");

  $allStoriesList.empty();

  // loop through all of our stories and generate HTML for them
  for (let story of storyList.stories) {
    const $story = generateStoryMarkup(story);
    $allStoriesList.append($story);
  }

  if(currentUser) {
    $allStoriesList.removeClass("logged-out");
    addFavoriteStar($allStoriesList);
  } else {
    $allStoriesList.addClass("logged-out");
  }

  $allStoriesList.show();
}

/** Generate favorited stories / add favorite icons */

function putFavoriteStoriesOnPage() {
  console.debug("putFavoriteStoriesOnPage");

  $favoriteStoriesList.empty();

  if(currentUser.favorites.length === 0) {
    $favoriteStoriesList.show();
    $favoriteStoriesList.append("<h5>Go favorite something!</h5>");
  } else {
      for(let story of currentUser.favorites) {
        $favoriteStoriesList.show();
        const $story = generateStoryMarkup(story);
        $favoriteStoriesList.append($story);
        }
      addFavoriteStar($favoriteStoriesList);
  }
}

function putMyStoriesOnPage() {
  console.debug("putMyStoriesOnPage");

  $myStoriesList.empty();

  if(currentUser.ownStories.length === 0) {
    $myStoriesList.show();
    $myStoriesList.append("<h5>Go add some of your own stories!</h5>");
  } else {
      for(let story of currentUser.ownStories) {
        $myStoriesList.show();
        const $story = generateStoryMarkup(story);
        $myStoriesList.append($story);
      }
    addFavoriteStar($myStoriesList);
    addTrashIcon($myStoriesList);
  }

}

/** Submit new story function */

async function submitStory(evt) {
  console.debug("submitStory");
  evt.preventDefault();

  const author = $("#submit-author").val();
  const title = $("#submit-title").val();
  const url = $("#submit-url").val();
  const username = currentUser.username;
  const submitData = { title, url, author, username };

  const newStory = await storyList.addStory(currentUser, submitData);

  const $story = generateStoryMarkup(newStory);
  $allStoriesList.prepend($story);
  $submitForm.hide();
  await putStoriesOnPage();
}

$submitForm.on("submit", submitStory);

async function removeMyStory(evt) {
  console.debug("removeMyStory");
  evt.preventDefault();
  
  const storyId = $(evt.target).closest("li").attr("id");

  await storyList.removeMyStory(currentUser, storyId);

  await putMyStoriesOnPage();
}

/** Add Favorite star icon */

function addFavoriteStar(storyList){
  // console.debug("addFavoriteStar");

  /** favStatus: far = star outline (no) / fas = filled in star (yes) */
  for(let story of storyList.children()) {
    const $story = $(story);

    let favStatus = "far";

    if (favoriteCheck($story.attr("id"))) {
      favStatus = "fas";
    }

    const starIcon = $("<i>").addClass(`fa-star ${favStatus}`);
    const starSpan = $("<span>").addClass("star");

    starIcon.on("click", toggleFavorite);

    starSpan.append(starIcon);
    $story.prepend(starSpan);
  }
}

/** Check story favorite status */

function favoriteCheck(storyID) {
  let favIndex = currentUser.favorites.findIndex(function (story) {
    return story.storyId === storyID;
  });

  if(favIndex === -1) {
    return false;
  } else if (favIndex !== -1) {
    return true;
  }

  
}

/** Toggle favorite on click */

async function toggleFavorite() {
  console.debug("toggleFavorite");

  const storyId = $(this).parent().parent().attr("id");

  if(favoriteCheck(storyId)) {
    await currentUser.removeFavoriteStar(storyId);

    $(this).addClass("far").removeClass("fas");
  } else{
    await currentUser.addFavoriteStar(storyId, storyList);

    $(this).addClass("fas").removeClass("far");
  }

}

function addTrashIcon(storyList){
  console.debug("addTrashIcon");

  for(let story of storyList.children()) {
    const $story = $(story);

    const trashIcon = $("<i>").addClass("fas fa-trash-alt");
    const trashSpan = $("<span>").addClass("trash-can");

    trashSpan.on("click", removeMyStory);

    trashSpan.append(trashIcon);
    $story.prepend(trashSpan);
  }
}
