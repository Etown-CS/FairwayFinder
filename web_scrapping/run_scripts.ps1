#PowerShell Script that Runs Scripts

# Clubs
cd "scrape-and-ag/scripts/clubs"
& ".\drivers.ps1"
& ".\fairway-woods.ps1"
& ".\irons.ps1"
& ".\wedges.ps1"
& ".\putters.ps1"
& ".\hybrids.ps1"

# Balls
# cd "scrape-and-ag/scripts/balls"
cd "../balls"
& ".\personalized.ps1"
& ".\all.ps1"

# Balls
cd "../gloves"
& ".\left_men.sh"
& ".\left_women.sh"
& ".\other_men.sh"
& ".\other_women.sh"
& ".\right_men.sh"
& ".\right_women.sh"

cd "../../../"