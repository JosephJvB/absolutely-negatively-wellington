1. get dataset of beatWelly tweets
2. Figure our how to detect yes / no tweets
    - set up list of positive / negative
    - stretch: link sentiment analysis api instead
3. Set up webhook to call lambda on beatWelly tweets
    1. deploy code
    2. register webhook
        1. apply for elevated twitter api
        2. respond to challenge
    3. subscribe webhook specifically to welly account
4. Like tweet if tweet contains no/nope etc

wip: test tweets against json again
then start writing lamdbda code
do I need to handle auth properly besides hard coding token??