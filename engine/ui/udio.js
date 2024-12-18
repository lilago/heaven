/*
 * © MedioAI.com - Wynter Jones (@AI.MASSIVE)
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 */

const uiMedioAI = {
  sidebarLinks: /* html */ `
<div class="-ml-5 pl-[16px]"><div class="relative flex items-center rounded-lg py-3 pr-4 hover:text-foreground"><a id="medioai-link" class="mr-4 flex items-center" aria-label="" href="/following">
<span class="brand-gray-light hover:text-white">${iconsMedioAI.songStudio}</span>
<span id="medioai-link-text" class="brand-gray-light ml-3 flex-1 whitespace-nowrap text-[16px]">MedioAI</span></a>
</div></div>`,

  sidebarRadio: /* html */ `
<button id="medioai-radio" class="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground relative h-8 w-8 rounded-full p-1 -mr-2" style="margin-right: -20px;font-size: 23px;">
  ${iconsMedioAI.radio}
</button>`,

  songStudio: async () => {
    const logo = chrome.runtime.getURL('icon/128x128.png')
    return /* html */ `
<button
  id="close-medioai"
  style="
    position: absolute;
    top: 16px;
    right: 16px;
    background: none;
    border: none;
    color: #fff;
    font-size: 34px;
    cursor: pointer;
    border-radius: 100%;
    padding: 6px 12px;
  "
>
  &times;
</button>

<div id="medioai-content">
  <input type="hidden" id="lyric-id" />
  <input type="hidden" id="mediotag-id" />

  <h1
    class="flex justify-between items-center space-x-2"
    style="font-size: 24px; font-weight: 700; margin-bottom: 16px"
  >
    <div class="flex select-none items-center space-x-2">
      <img src="${logo}" style="width:
      48px; height: 48px; border-radius: 6px; margin-right: 8px" />
      <span class="font-bold">MedioAI</span>
      <span class="text-xs font-bold -mt-2" style="color: #20CC9F">v${
        chrome.runtime.getManifest().version
      }</span>
      <span
        id="medioCharactersSelected"
        style="display: none"
        class="text-sm text-gray-300 flex-1 whitespace-nowrap font-medium"
        ></span>
    </div>
    <div class="flex space-x-2 items-center">
      <button id="medioaiHelp" style="display:none" class="flex items-center space-x-1">
        ${iconsMedioAI.help}
        <span>Watch Training Videos</span>
      </button>
      <button id="medioaiRadio" class="flex items-center space-x-1">
        ${iconsMedioAI.radio}
        <span>Udio Radio</span>
      </button>
      <button id="medioaiChallenge" class="flex items-center space-x-3">
        ${iconsMedioAI.challenge}
      </button>
      <button id="medioaiTools" class="flex items-center space-x-3">
        ${iconsMedioAI.tools}
      </button>
      <button id="medioaiSettings" class="flex items-center space-x-3">
        ${iconsMedioAI.cog}
      </button>
    </div>
  </h1>

  <div
    role="tablist"
    aria-orientation="horizontal"
    class="h-10 items-center select-none justify-center rounded-md bg-muted p-1 text-muted-foreground grid w-full mb-4"
    style="grid-template-columns: repeat(7, minmax(0, 1fr))"
    tabindex="0"
    data-orientation="horizontal"
    style="outline: none"
  >
    <button
      type="button"
      data-tab="write"
      class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3 bg-black"
    >
      Write
    </button>
    <button
      type="button"
      data-tab="build"
      class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
    >
      Tags
    </button>
    <button
      type="button"
      data-tab="rhyme"
      class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
    >
      Rhyme
    </button>
    <button
      type="button"
      data-tab="ask"
      class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
    >
      Chat
    </button>
    <button
      type="button"
      data-tab="wizard"
      class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
    >
      Co-Writer
    </button>
    <button
      type="button"
      data-tab="library"
      class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
    >
      Lyrics
    </button>
    <button
      type="button"
      data-tab="tags"
      class="lyric-tab-button inline-flex items-center justify-center whitespace-nowrap rounded-sm py-1.5 text-sm font-medium ring-offset-background transition-all data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 px-3"
    >
      Tag Groups
    </button>
  </div>

  <div style="display: none" id="medioai-training">
    <div id="medioai-training-search" class="mb-2">
      <input type="text" id="medioai-training-searchbox" placeholder="Search for training videos..." class="w-full border rounded p-2 px-3" />
    </div>
    <div id="medioai-training-video-wrapper">
      <h3 class="text-lg my-2 text-white font-bold">Udio Training Videos</h3>
      <div id="medioai-training-videos" class="grid grid-cols-4 gap-3"></div>

      <h3 class="text-lg my-2 text-white font-bold">MedioAI Training Videos</h3>
      <div id="medioai-training-videos-medio" class="grid grid-cols-4 gap-3"></div>
    </div>

    <div id="medioai-training-player" style="display: none">
      <div class="px-2">
        <div id="medioai-training-videoplayer" class="aspect-ratio">
          <iframe width="560" height="315" src="https://www.youtube.com/embed/U0cCmmXFbYw" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
        </div>
      </div>

      <div id="medioai-training-info">
        <h1>How to make a playlist</h3>
        <h2>Last updated: 2 days ago</h4>
        <div id="medioai-article">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illo nisi tenetur asperiores dolore, dolores alias vitae at quibusdam, magni sequi, atque quod minus voluptatibus fuga magnam veniam doloremque quis!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illo nisi tenetur asperiores dolore, dolores alias vitae at quibusdam, magni sequi, atque quod minus voluptatibus fuga magnam veniam doloremque quis!</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur illo nisi tenetur asperiores dolore, dolores alias vitae at quibusdam, magni sequi, atque quod minus voluptatibus fuga magnam veniam doloremque quis!</p>
        </div>
      </div>
    </div>
  </div>

  <div style="display: none" id="mediochattab">
    <div id="medioaichat"></div>
    <div class="flex w-full">
      <textarea
        id="medioaiMessageBox"
        placeholder="Write message..."
        class="w-full"
      ></textarea>
      <button id="medioaiSendMessage">Send</button>
    </div>
  </div>

  <div style="display: none" id="mediochats"></div>

  <div style="display: none" class="lyric-tab" data-tab="build">
    <div class="mb-4 relative">
      <span class="text-sm text-gray-200 mb-2 block select-none">Search & Browse</span>
      <div
        id="medioSearchClear"
        class="absolute"
        style="top: 40px; right: 13px"
      >
        ${iconsMedioAI.search}
      </div>
      <input
        type="text"
        id="searchTags"
        autocomplete="off"
        placeholder="Search for tags..."
        class="w-full border rounded p-2 px-3"
      />
      <div
        id="medioSearchDropdown"
        class="w-full bg-black mt-2 absolute p-4 rounded shadow-xl border flex flex-x-2 flex-y-2 items-start"
        style="display: none"
      >
        <p class="text-xs text-gray-400">Search results will appear here...</p>
      </div>
    </div>
    <div class="flex space-x-4">
      <div class="w-1/4">
        <select
          id="medio-builder-genre"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
      <div class="w-1/4">
        <select
          id="medio-builder-artist"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
      <div class="w-1/4">
        <select
          id="medio-builder-emotion"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
      <div class="w-1/4">
        <select
          id="medio-builder-period"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
    </div>
    <div class="flex space-x-4 mt-4">
      <div class="w-1/4">
        <select
          id="medio-builder-region"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
      <div class="w-1/4">
        <select
          id="medio-builder-vocal"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
      <div class="w-1/4">
        <select
          id="medio-builder-instruments"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
      <div class="w-1/4">
        <select
          id="medio-builder-production"
          class="medioAddTag w-full border rounded p-1"
        ></select>
      </div>
    </div>
    <div class="py-4">
      <span class="text-sm text-gray-200 mb-2 block select-none">Prompt</span>

      <textarea
        placeholder="Write music prompt tags here..."
        class="w-full p-6 rounded border mb-3"
        id="medioTagBox"
        style="height: 180px"
      ></textarea>

      <hr class="mt-2 mb-6 border-t border-gray-700" />

      <div class="flex justify-between space-x-4">
        <input
          id="medioTagBoxTitle"
          autocomplete="off"
          type="text"
          placeholder="Give your tag group a name..."
          class="w-full p-2 px-4 rounded border mb-3"
          style="width: 100%"
        />
        <div class="flex space-x-1 select-none">
          <button id="medio-saveTags">Save</button>
          <button id="medio-useTags">Use</button>
          <button id="medio-clearTags">Clear</button>
          <button id="medio-copyTags">Copy</button>
        </div>
      </div>
    </div>
  </div>

  <div style="display: none" class="lyric-tab" data-tab="tags">
    <div id="medio-taglibrary-items"></div>
  </div>

  <div style="display: none" class="lyric-tab" data-tab="ask">
    <div id="medioask" style="display: none">
      <textarea
        name="medioaskai"
        id="medioaskai"
        placeholder="What do you want to ask?"
      ></textarea>
      <div class="flex space-x-2 items-center justify-between mt-2">
        <div class="flex items-center justify-between">
          <button id="medioAskAIQuestion" class="flex select-none items-center space-x-2">
            ${iconsMedioAI.send}
            <span>Send</span>
          </button>

          <div class="ml-4 text-sm text-gray-400">
            <input
              id="medioaiIncludeLyrics"
              name="medioaiIncludeLyrics"
              type="checkbox"
              checked
            />
            <label for="medioaiIncludeLyrics" class="ml-1">
              Include current lyrics in the request.
            </label>
          </div>
        </div>
        <div class="flex space-x-2 select-none items-center">
        <button id="medioAskChatList" class="flex select-none items-center space-x-2">
            ${iconsMedioAI.chats}
            <span>View Past Chats</span>
          </button>
          
        </div>
      </div>

      <hr style="margin: 15px 0" class="my-8 border-t border-gray-700" />

      <h4 class="text-sm text-gray-400 font-medium mb-2 select-none">Pre-made Requests</h4>
      <div class="grid grid-cols-4 gap-4" id="medioSuggestions">
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Replace the lyrics with phonetic spelling.
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Check my lyrics for grammar & spelling mistakes.
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Write 5 critical social media comments about my lyrics.
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Review my song as if you were a music critic.
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Give me pointers on how to improve my lyrics.
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest synonyms or alternative phrases for specific words in
          my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my lyrics more emotionally impactful?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you analyze the overall tone or mood of my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any clichés in my lyrics that I should avoid?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me brainstorm new ideas or themes for my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What poetic devices can I incorporate to enhance my lyrics (e.g.,
          metaphors, similes, imagery)?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my lyrics more relatable to a wider audience?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any inconsistencies or contradictions in my lyrics that need
          to be addressed?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to improve the flow or rhythm of my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create stronger hooks or memorable phrases in my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any cultural references in my lyrics that might not be
          universally understood?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me fine-tune the storytelling aspect of my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What can I do to make my lyrics more vivid and descriptive?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any lines or verses in my lyrics that feel out of place or
          unnecessary?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you provide feedback on the overall structure of my song lyrics
          (e.g., verse-chorus-bridge)?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I maintain coherence and unity throughout my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make my lyrics more engaging or
          thought-provoking?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any opportunities for wordplay or clever turns of phrase in
          my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me strike a balance between being too literal and too
          abstract in my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I ensure that my lyrics complement the melody and musical
          arrangement effectively?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest a suitable rhyme scheme for my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I vary the vocal delivery to enhance the lyrical impact?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What genre-specific elements can I incorporate into my song lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to build tension and release in the song
          structure?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a memorable pre-chorus section in my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any opportunities for vocal harmonies in my song lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me establish a consistent narrative arc throughout the
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What role can repetition play in reinforcing key themes or ideas in my
          lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I effectively use contrast between sections (e.g., verse and
          chorus) in my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to transition smoothly between different song
          sections?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a powerful climax in my song lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Are there any opportunities for call-and-response elements in my
          lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to incorporate dynamic shifts in the song
          structure?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I effectively use pauses or silence for dramatic effect in the
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What techniques can I use to create a catchy hook for my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to develop a strong opening line for my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a sense of resolution in the song's conclusion?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What considerations should I keep in mind when crafting a bridge
          section?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song structure more dynamic and
          engaging?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create contrast between verses to keep the listener engaged?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What elements can I add to create a sense of progression throughout
          the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me craft a compelling outro for my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I use tempo changes to enhance the emotional impact of the
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What techniques can I use to make the song lyrics more memorable?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to create a sense of urgency or excitement in the
          song structure?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I effectively use modulation to add interest to the song's
          progression?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          What role can dynamics play in shaping the overall feel of the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me create a memorable refrain for my song lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I use parallelism to reinforce key themes or ideas in my
          lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me turn my heartbreak into a catchy disco anthem?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song about laundry detergent more exciting?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest a way to incorporate a kazoo solo into my song about
          office supplies?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song about procrastination sound urgent and
          important (but still procrastinate on finishing it)?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a love song to my favorite snack food?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I turn my mundane daily routine into an epic rock opera?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make my song about aliens invading Earth more
          relatable to extraterrestrials?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I incorporate the sound of rubber chickens into my song about
          existential dread?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a breakup song from the perspective of a
          houseplant?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song about being stuck in traffic more upbeat and
          danceable?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to incorporate humor into my lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I infuse my song with a sense of adventure?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a catchy chorus that sticks in people's heads?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my verses more relatable to listeners?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to build tension and excitement throughout the
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a memorable melody for my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me incorporate unexpected twists into the lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song more emotionally resonant?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to add depth and complexity to the lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create contrast between different sections of the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me craft a powerful climax for the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I ensure that my song is engaging from start to finish?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song more dynamic?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create an intriguing narrative arc within the lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me incorporate vivid imagery into the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song more thought-provoking?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song structure more cohesive?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I add layers of meaning to the lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me create a sense of atmosphere in the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I incorporate interesting wordplay into the lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song more visually evocative?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a sense of unity throughout the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a memorable hook for the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I incorporate elements of surprise into the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to make the song more relatable to listeners?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a sense of urgency or excitement in the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me incorporate different perspectives into the lyrics?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make my song more memorable and impactful?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to add depth and complexity to the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a strong emotional connection with the audience?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me write a bridge section that provides contrast to the
          rest of the song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make the song more interactive or engaging for live
          performances?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest an attention-grabbing intro for my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I create a smooth transition from the intro to the first
          verse?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me craft a memorable outro that leaves a lasting
          impression?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make the outro feel like a satisfying conclusion to the
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest sound effects to enhance the mood of specific song
          sections, like a [Wolf Howl] for added atmosphere?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I integrate sound effects seamlessly into my song without
          overpowering the music?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you help me brainstorm creative sound effect ideas to elevate my
          song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I use sound effects to create a sense of narrative or
          storytelling in my song?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          Can you suggest ways to incorporate natural sounds, like birds
          chirping or waves crashing, into my song for added texture?
        </div>
        <div class="medioAskAIPremadeQuestion border rounded p-6">
          How can I make the use of sound effects feel organic and integral to
          the overall musical experience?
        </div>
      </div>
    </div>
    <div
      id="medioapiExplainerask"
      class="text-center w-full"
      style="display: none"
    >
    <h3 class="text-2xl text-gray-200 font-bold mb-2 mt-8">Requires API Key</h3>
    <p>
      You must add your
      <span style="background: #27272a" class="rounded p-2 text-xs"
        >OpenAI</span
      > or <span style="background: #27272a" class="rounded p-2 text-xs"
      >OpenRouter</span
    >
      API key in order to use this feature.
    </p>
    <p class="mt-4 text-sm opacity-70">Ask the AI for quick tasks or questions around your lyrics.</p>
    </div>
  </div>

  <div style="display: none" class="lyric-tab" data-tab="wizard">
    <div id="mediowizard" style="display: none">
      <div class="flex space-x-6 mb-2">
        <div class="w-1/2">
          <label class="medioaiLabel">Song Title</label>
          <input
            type="text"
            class="medioaiInputBox"
            id="mediowriterSongTitle"
            placeholder="Name your song..."
            autocomplete="off"
          />
        </div>
        <div class="w-1/2">
          <label class="medioaiLabel">Structure</label>
          <select class="medioaiSelectBox" name="mediowriterStructure" id="mediowriterStructure">
            <option value="standard">Standard</option>
            <option value="epic">Epic</option>
            <option value="sonnet">Sonnet</option>
            <option value="storytelling">Storytelling</option>
            <option value="duet">Duet</option>
          </select>
        </div>
      </div>
      <div class="flex space-x-6 mb-2">
        <div class="w-1/2">
          <label class="medioaiLabel">Theme</label>
          <textarea
            class="medioaiTextBox"
            name="mediowriterTheme"
            id="mediowriterTheme"
            placeholder="What is the theme of your song?"
          ></textarea>
        </div>
        <div class="w-1/2">
          <label class="medioaiLabel">Emotion</label>
          <textarea
            class="medioaiTextBox"
            name="mediowriterEmotion"
            id="mediowriterEmotion"
            placeholder="Describe the emotion of your song."
          ></textarea>
        </div>
      </div>
      <div class="mb-2">
        <label class="medioaiLabel">Tags (Genre, Artists, etc)</label>
        <input
          type="text"
          autocomplete="off"
          class="medioaiInputBox"
          name="mediowriterTags"
          id="mediowriterTags"
          placeholder="Add your tags here... (tip: you can use the Tag Builder)"
        />
      </div>
      <div class="flex space-x-2 items-center justify-between mt-6">
        <div class="flex space-x-2 w-full items-center justify-between">
          <div class="flex space-x-2">
            <button id="medioWriteSong" class="flex select-none items-center space-x-2">
              ${iconsMedioAI.send}
              <span>Start Writing</span>
            </button>

            <button id="medioSongRollDice" class="flex select-none items-center space-x-2">
              ${iconsMedioAI.dice}
              <span>Randomize</span>
            </button>

            <button id="medioSongClear" class="flex select-none items-center space-x-2">
              ${iconsMedioAI.clear}
              <span>Clear</span>
            </button>
          </div>

          <button id="medioSongChatList" class="flex w-auto block select-none items-center space-x-2">
            ${iconsMedioAI.chats}
            <span>View Past Songs</span>
          </button>
        </div>
      </div>
    </div>
    <div
      id="medioapiExplainerwizard"
      class="text-center w-full"
      style="display: none"
    >
    <h3 class="text-2xl text-gray-200 font-bold mb-2 mt-8">Requires API Key</h3>
    <p>
      You must add your
      <span style="background: #27272a" class="rounded p-2 text-xs"
        >OpenAI</span
      > or <span style="background: #27272a" class="rounded p-2 text-xs"
      >OpenRouter</span
    >
      API key in order to use this feature.
    </p>
    <p class="mt-4 text-sm opacity-70">
      Use the <strong>Co-Writer</strong> to craft your lyrics from scratch
      with the help of an AI.
    </p>
    </div>
  </div>

  <div style="display: none" class="lyric-tab" data-tab="rhyme">
    <div class="flex items-center justitfy-between mb-4 select-none">
      <input
        autocomplete="off"
        type="text"
        id="wordInput"
        placeholder="Enter a word to find rhymes..."
      />
      <button id="medioai-findRhymeClear">Clear</button>
      <button id="medioai-findRhyme">Find Rhymes</button>
    </div>
    <div
      id="results"
      class="w-full grid grid-cols-4 gap-2"
      style="display: none"
    ></div>
    <div id="medioRhymeExplainer" class="text-center select-none w-full">
      <h3 class="text-2xl text-gray-200 font-bold mb-2 mt-8">
        Search for Rhymes
      </h3>
      <p>
        Search the
        <span style="background: #27272a" class="rounded p-2 text-xs">
          Datamuse
        </span>
        free API for any word that might rhyme for catchier lyrics.
      </p>
    </div>
  </div>

  <div style="display: none" class="lyric-tab" data-tab="library">
    <div id="medio-library-items"></div>
  </div>

  <div class="lyric-tab" data-tab="write">
    <div id="toolbar" class="flex items-center justify-between">
      <div class="flex space-x-2">
        <input
          autocomplete="off"
          type="text"
          id="lyric-title"
          placeholder="Song Title..."
        />
        <button
          id="save-lyrics"
          class="flex select-none items-center space-x-2 medio-toolbar-button"
        >
          ${iconsMedioAI.save}
          <span>Save</span>
        </button>
        <button
          id="clear-lyrics"
          class="flex select-none items-center space-x-2 medio-toolbar-button"
        >
          ${iconsMedioAI.clear}
          <span>Clear</span>
        </button>
      </div>
      <div class="flex items-center justify-center w-full">
        <button
          id="send-lyrics"
          class="flex select-none items-center space-x-2 medio-toolbar-button"
        >
          ${iconsMedioAI.sendLyrics}
          <span>Use Selected</span>
        </button>
      </div>
      <div class="flex w-full space-x-2 justify-end items-end">
        <select id="medioaiCommands" class="ql-custom-dropdown"></select>
        <select id="medioaiInstruments" class="ql-custom-dropdown"></select>
        <select id="medioaiStructures" class="ql-custom-dropdown"></select>
        <select id="medioextraCommands" class="ql-custom-dropdown"></select>
      </div>
    </div>
    <div id="editor"></div>
    <style id="medioCSS">
      .ql-editor {
        font-size: ${await utilitiesMedioAI.getSettings('lyrictextsize')};
      }
      .medioComment {
        opacity: 0.4;
      }
      .medioCommand {color: ${await utilitiesMedioAI.getSettings('commandcolor')}}
    </style>
  </div>
</div>
`
  },

  placeholder: (title, msg) => {
    return /* html */ `
<h3 class='text-2xl text-gray-200 font-bold mb-2 select-none text-center'>${title}</h3>
<p class="select-none text-center">${msg}</p>
`
  },
}
