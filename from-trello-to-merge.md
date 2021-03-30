# How to Contribute to Code for Chicago Website Project
Here are the steps to guide you through the process of contributing to the CfC Website. 

1. Find a Trello card in the "To-Do" column you want to take on. Assign your name to it by clicking the pencil icon in the top right of the card when you hover over it. Click "Change Member" and add yourself. 

2. Move the card to the "In Progress" Column. 

3. Make a new branch. ```git checkout -b <branch-name>``` Usuallly the branch name is named after the feature you are adding.

4. Do your coding magic. 

5. When you are ready to commit the changes; in your terminal type
``` git add -A``` to stage your changes and ```git commit -m "Message on what changes you've made"```to make the commit. 
If this is the first commit you've made to this branch you will need to ```git push --set-upstream origin <branch-name>```
Otherwise if you've already set the upstream you can just ```git push```

6. Once you are ready to open a pull request go to https://github.com/Code-For-Chicago/code-for-chicago-jekyll/ and if you are lucky there will be a yellow notice offering you to "Compare & pull request".*

7. You should get a green checkmark saying "Able to Merge".

8. Click "Create pull request". 

9. Move the Trello card from "In Progress" to "Code Review".

10. Your PR must be approved by a reviewer before it can be merged into the master branch. It's helpful to leave the link to the Trello card in the notes of the PR. Then click the gearbox next to the "Reviewers" section on the right. You can request reviewers to look at your changes. 

11. Eventually someone will review your PR request and either give feedback or approve it. Repeat steps 4-9 if changes were requested. Otherwise if it's a design change, you'll need a designer's approval as well. 

12. The bottom check will be labeled "netlify/thirsty-davinci-2a9aa9/deploy-preview" and the "details" link will be a link to a deployed version of that branch.
![details link](images/how-to1.png)
Copy this link into the Trello card itself so a designer can check it. 

13. Move the Trello card to the "Test/Review" column. If the designers request a change you'll have to move the card back to "In Progress" and repeat steps 4-13 (use your best judgement whether the changes also require an additional code review).

14. Once everything is as it should be you can finally merge your changes. Click "Merge pull request" at the bottom of the PR page. You are done! 

 *If it's not there you can go to the "Pull Requests" tab at the top, click the green "New Pull Request" button, and select your branch in the right branch dropdown. Then click "Create Pull Request"