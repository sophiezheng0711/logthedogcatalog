import pandas as pd
import re
import requests
from PIL import Image
import json

df = pd.read_excel("data.xlsx")
breed_temp = df["Name"]

breeds = [re.sub("\s", "-", x.strip().lower()) for x in breed_temp]
breeds_final = [x for x in breeds]

# manual changes before we automated it below except the last channge -- löwchen is proper breed name
breeds[breeds.index("american-english-coonhound")] = "coonhound"
breeds[breeds.index("american-foxhound")] = "foxhound"
breeds[breeds.index("american-leopard-hound")] = "catahoula-leopard-dog"
breeds[breeds.index("entlebucher-mountain-dog")] = "entlebucher"
breeds[breeds.index("australian-stumpy-tail-cattle-dog")] = "australian-cattle-dog"
breeds[breeds.index("belgian-sheepdog")] = "belgian-shepherd"
breeds[breeds.index("lwchen")] = "lowchen"
breed_ids = [""]*len(breeds_final)

base = "https://www.adoptapet.com/s/adopt-a-"
failed = []
breed_mappings = {}

for breed in breeds:
    try:
        URL = base + breed
        r = requests.get(URL)
        start = r.text.index("\"breedId\":")
        finish = r.text[start:].index(",")
        breedId = r.text[start + 10 :start + finish] 
        breed_ids[breeds.index(breed)] = breedId
    except:
        try:
            to_try = breed[breed.index("-") + 1:]
            URL = base + to_try
            r = requests.get(URL)
            start = r.text.index("\"breedId\":")
            finish = r.text[start:].index(",")
            breedId = r.text[start + 10 :start + finish] 
            breed_ids[breeds.index(breed)] = breedId
        except:
            try:
                to_try2 = to_try[to_try.index("-") + 1:]
                URL = base + to_try2
                r = requests.get(URL)
                start = r.text.index("\"breedId\":")
                finish = r.text[start:].index(",")
                breedId = r.text[start + 10 :start + finish] 
                breed_ids[breeds.index(breed)] = breedId
            except:
                try:
                    to_try3 = breed[:breed.rfind("-")]
                    URL = base + to_try3
                    r = requests.get(URL)
                    start = r.text.index("\"breedId\":")
                    finish = r.text[start:].index(",")
                    breedId = r.text[start + 10 :start + finish] 
                    breed_ids[breeds.index(breed)] = breedId
                except:
                    failed += [breeds_final[breeds.index(breed)]]
    breed_mappings[breeds_final[breeds.index(breed)]] = breedId
    print(breeds.index(breed)+1, "/", len(breeds_final), ":", breeds_final[breeds.index(breed)], breedId)
    with open('breeIds.txt', 'w') as outfile:
        json.dump(breed_mappings, outfile, sort_keys=True, indent=4)

def getImages():
    not_found = Image.open("/Users/jakobkaminsky/Desktop/raredog.png")

    start = "https://images-ra.adoptapet.com/seo/1/h/"
    finish = "_h.png"

    for i, x in enumerate(breed_ids):
        if x != "":
            r = requests.get(start + str(x)+finish)
            if r.status_code == 200:
                with open("/Users/jakobkaminsky/Desktop/4300pics3/" + breeds_final[i] + ".jpg", 'wb') as f:
                    f.write(r.content)
        else:
            not_found.save("/Users/jakobkaminsky/Desktop/4300pics3/" + breeds_final[i] + ".png")