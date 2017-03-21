CRED_DIR = "/data/creds/aws"
CRED_FILE = "s3_bucket.csv"
unless File.exists?(File.join(CRED_DIR, CRED_FILE))
  throw "Cannot find #{CRED_FILE} under #{CRED_DIR}"
end

creds = File.readlines(File.join(CRED_DIR, CRED_FILE)).pop.chomp.split(',')
if creds.length != 2
  throw "Wrong format in file #{CRED_FILE}"
end

if Rails.env == 'production'
  bucket_name = ""
else
  bucket_name = "char-list-test"
end

Rails.application.config.s3_credentials = {
  :bucket => bucket_name, :access_key_id => creds[0], :secret_access_key => creds[1]
}