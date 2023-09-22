# change name of the key (ex: test-k1.key)
key_name="test-k1.key"
# generate key
ssh-keygen -t rsa -b 4096 -m PEM -f $key_name
# generate public key
ssh-keygen -e -m PEM -f $key_name > $key_name.pub

mv $key_name* ./test