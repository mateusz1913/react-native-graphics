require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

Pod::Spec.new do |s|
  s.name         = "react-native-graphics"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => "11.0", :osx => "10.14" }
  s.source       = { :git => "https://github.com/mateusz1913/react-native-graphics.git", :tag => "#{s.version}" }

  s.source_files = "apple/common/**/*.{h,m,mm,swift}"
  s.ios.source_files = "apple/ios/**/*.{h,m,mm,swift}"
  s.osx.source_files = "apple/macos/**/*.{h,m,mm,swift}"

  s.dependency "React-Core"
end
