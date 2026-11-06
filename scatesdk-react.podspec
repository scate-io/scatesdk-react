require "json"

package = JSON.parse(File.read(File.join(__dir__, "package.json")))

version_swift_path = File.join(__dir__, "ios/ScatesdkReactVersion.swift")
File.write(
  version_swift_path,
  <<~SWIFT
    // Generated from package.json — do not edit manually.
    enum ScatesdkReactVersion {
      static let value = "#{package['version']}"
    }
  SWIFT
)

folly_compiler_flags = '-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1 -Wno-comma -Wno-shorten-64-to-32'

Pod::Spec.new do |s|
  s.name         = "scatesdk-react"
  s.version      = package["version"]
  s.summary      = package["description"]
  s.homepage     = package["homepage"]
  s.license      = package["license"]
  s.authors      = package["author"]

  s.platforms    = { :ios => min_ios_version_supported }
  s.source       = { :git => "https://github.com/scate-io/scatesdk-react.git", :tag => "#{s.version}" }

  s.source_files = "ios/**/*.{h,m,mm,swift}"
  # The iOS SDK binary ships inside this package instead of coming from the ScateSDK pod:
  # CocoaPods trunk is read-only from 2 December 2026. sdk-release.sh replaces it each release.
  # It stays outside ios/ so source_files does not pick up the framework's headers.
  s.vendored_frameworks = "vendor/ScateSDK.xcframework"
  s.dependency "Adjust/AdjustGoogleOdm", "~> 5.6.1"

  # Use install_modules_dependencies helper to install the dependencies if React Native version >=0.71.0.
  # See https://github.com/facebook/react-native/blob/febf6b7f33fdb4904669f99d795eba4c0f95d7bf/scripts/cocoapods/new_architecture.rb#L79.
  if respond_to?(:install_modules_dependencies, true)
    install_modules_dependencies(s)
  else
  s.dependency "React-Core"
  

  # Don't install the dependencies when we run `pod install` in the old architecture.
  if ENV['RCT_NEW_ARCH_ENABLED'] == '1' then
    s.compiler_flags = folly_compiler_flags + " -DRCT_NEW_ARCH_ENABLED=1"
    s.pod_target_xcconfig    = {
        "HEADER_SEARCH_PATHS" => "\"$(PODS_ROOT)/boost\"",
        "OTHER_CPLUSPLUSFLAGS" => "-DFOLLY_NO_CONFIG -DFOLLY_MOBILE=1 -DFOLLY_USE_LIBCPP=1",
        "CLANG_CXX_LANGUAGE_STANDARD" => "c++17"
    }
    s.dependency "React-Codegen"
    s.dependency "RCT-Folly"
    s.dependency "RCTRequired"
    s.dependency "RCTTypeSafety"
    s.dependency "ReactCommon/turbomodule/core"
    
   end
  end    
end
