# Check All Tasks Button:

## How to Use - Setup Environment
1. [Download Chrome](https://www.google.com/chrome/thank-you.html?statcb=0&installdataindex=empty&defaultbrowser=0#)

2. [Download Requestly extension](https://chrome.google.com/webstore/detail/requestly-redirect-url-mo/mdnleldcmiljblolnjhpnblkcekpdkpa?hl=en)

---

## How to Use - Adding The Script
3. Copy `checkAllTasks.js` contents from this repo

4. Open Requestly extension in Chrome
5. Add the file to your Requestly library
	- Click the Menu Button
	- Click `Files`
	- Click `Create File`
	- Name your file
	- Paste the contents of `checkAllTasks.js`
	- Click `Create`
6. Create the Check All Tasks Rule
	- Click `New Rule`
	- Click `Insert Scripts`
	- Name the Rule
	- Under `if request URL contains`:
		- Add `intranet.hbtn.io/projects/`
	- Click `Insert Custom Script`
	- Use the `Pick from Library` button on the right side of the `Source` field
	- Select the file you just added in step 5!

## Enjoy the CATB!
- If you find any bugs, please report them so they can be squashed! Otherwise, happy checking!
