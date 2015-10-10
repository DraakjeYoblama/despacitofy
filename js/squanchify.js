$(document).ready(function(){

    // Oh geez, oh man Rick...I guess I'll start it off.
    squanchify(0.95);

    /* If people have endless scrolling on, Morty, I'm...I'm gonna make
       sure those assholes don't lose their squanch. You-you gotta keep
       the squanch GOING, Morty. More. MORE! Let's see where this goes! */
    $(document).scroll(function(){
        if($(window).scrollTop() + $(window).height() == $(document).height()) {
            setTimeout(squanchify(0.95), 5000);
        }
    });
});

squanchify = function(squanchiness){

    // Don't squanch prepositions, in/definite articles, pronouns, etc.
    var unsquanchables = ["&nbsp","a","aboard","about","above","absent","across","after",
    "against","along","alongside","amid","amidst","among","an","and","are","around","as","at",
    "atop","before","behind","below","beneath","beside","between","by","despite",
    "down","during","except","following","for","from","he","her","hers","him","his","i","i'd","i'm","i've","in","is","inside","into",
    "like","mid","minus","near","next","notwithstanding","of","off","on","onto",
    "opposite","outside","over","past","plus","regarding","round","save","she",
    "since","than","that","the","their","them","they","they've","those","through","throughout","till",
    "times","to","toward","under","underneath","until","up","upon","we","which","who",
    "whom","whose","with","within","without","you"];

    listOfSelectors = ["a","span","p","h1","h1","h2","h3","h4","h5","h6"];

    listOfSelectors.forEach(function(selector){

        var DOMElements = document.querySelectorAll(selector);
        for (var i = 0; i < DOMElements.length; i++){

            var elementText = DOMElements[i].innerHTML.trim();

            // Uhh, I guess we don't want nested elements to, you know, be re-squanched...
            // Yeah--UURP--brilliant deduction.
            var hasBeenSquanched = elementText.match(/squanch/i);

            if (elementText && !hasBeenSquanched) {

                /* A-alright, we've gotta...we've gotta--UURP--pull out the LINKS here, Morty. The LINKS.
                   If we don't do that, Morty, all the links are gonna break. They're gonna...break, Morty.
                   It's just gonna be one...one big, big broken link party. Just sitting around
                   being broken. Do you get it? */
                var possibleLinks = elementText.match(/<.*>/);

                /* Oh man, Rick, it's...you know, like it's gonna be hard to, umm, put the links back
                   in after we Squanchify everything, won't it? I mean...h-how are we gonna...even...know
                   where to put them once we're done? */
                /* Relax, Morty. It's fine. Everything's fine. We'll just leave an empty string in the array
                   where they came from and stick it back in later. No one will even know the difference,
                   Morty. We're really...wuhh...flying under the radar with this one. */
                var unSquanchedWords = elementText.split(/\s+|\s*<.*>\s*/);
                var length = unSquanchedWords.length;
                for (var j = 0; j < length; j++) {

                     /* Too much squanching just gets annoying. Plus, this code would
                        longer otherwise. */
                        // Okay, Morty. Here's the word. Don't forget it.
                        var wordToSquanch = unSquanchedWords[j];

                        var prevSquanch;
                        if (j > 0)
                            prevSquanch = unSquanchedWords[j-1].match(/squanch/i);
                        var hasCharacters = wordToSquanch.match(/[a-z]/i);


                    if (Math.random() > squanchiness && hasCharacters && !prevSquanch) {

                        var squanchText;
                        var isSquanchable = true;

                        var ch = wordToSquanch.charAt(0);
                        var isAllCaps = (wordToSquanch === wordToSquanch.toUpperCase());
                        squanchText = (ch === ch.toUpperCase()) ? "Squanch" : "squanch";

                        /* Various rules for determining how to squanch the word,
                           given the context. */
                        if (wordToSquanch.substr(wordToSquanch.length - 3, 3) === "ing")
                            squanchText += "ing";
                        else if (wordToSquanch.substr(wordToSquanch.length - 2, 2) === "ly")
                            squanchText += "ly";
                        else if (wordToSquanch.substr(wordToSquanch.length - 2, 2) === "es")
                            squanchText += "es";
                        else if (wordToSquanch.substr(wordToSquanch.length - 2, 2) === "ed")
                            squanchText += "ed";
                        else if (wordToSquanch.slice(-1) === "s")
                            squanchText += "s";
                        else {

                            var low = 0;
                            var hi = unsquanchables.length -1;

                            // Oh geez, Rick, what're you doing now?
                            var lowerSquanch = wordToSquanch.toLowerCase();
                            while(hi >= low) {
                                mid = Math.round((hi + low)/2);
                                if (lowerSquanch === unsquanchables[mid]) {
                                    isSquanchable = false;
                                    break;
                                }
                                else if (wordToSquanch > unsquanchables[mid])
                                    low = mid + 1;
                                else
                                    hi = mid - 1;
                            }
                        }
                        // Initialize the words in question.
                        if (isSquanchable) {
                            if (isAllCaps)
                                squanchText = squanchText.toUpperCase();

                            unSquanchedWords[j] = squanchText;
                        }
                    }
                }
                // See, Morty? No one even noticed. You little piece of shit.
                if (possibleLinks) {
                    for (j = 0; j < possibleLinks.length; j++) {
                        unSquanchedWords[unSquanchedWords.indexOf("")] = possibleLinks[j];
                    }
                }

                squanchedWords = unSquanchedWords.join(" ");
                DOMElements[i].innerHTML = squanchedWords.trim();
            }
        }
    });
};